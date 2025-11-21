import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import GradientBackground from '@/components/GradientBackground';
import { useNavigate } from 'react-router-dom';
import { useResume } from '@/context/ResumeContext';
import { CheckCircle } from 'lucide-react';
import logo from '@/assets/logo.png';
import Template1 from '@/components/templates/Template1';
import Template2 from '@/components/templates/Template2';
import Template3 from '@/components/templates/Template3';

import { ResumeData } from '@/types/resume';

const sampleData: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    portfolio: 'johndoe.com',
    github: 'github.com/johndoe',
  },
  objective: 'Results-driven software engineer with 5+ years of experience in full-stack development, specializing in React and Node.js.',
  education: [{
    id: '1',
    institution: 'University of California',
    degree: 'B.S. in Computer Science',
    location: 'Berkeley, CA',
    startDate: { month: 'September', year: '2015' },
    endDate: { month: 'May', year: '2019' },
    isPresent: false,
  }],
  experience: [{
    id: '1',
    company: 'Tech Company Inc.',
    title: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    startDate: { month: 'June', year: '2019' },
    endDate: { month: '', year: '' },
    isPresent: true,
    description: ['Led development of scalable web applications', 'Mentored team of 5 junior engineers'],
  }],
skills: {
  languages: 'JavaScript, Python, TypeScript',
  frameworks: 'React, Node.js, Django',
  tools: 'Git, Docker, AWS',
  other: '',
},

projects: [{
  id: '1',
  title: 'E-commerce Platform',
  description: 'Built a full-stack e-commerce platform using React and Node.js',
  technologies: ['React, Node.js, MongoDB'],
}],

certifications: 'AWS Certified Developer',

coursework: 'Data Structures, Algorithms, Database Systems',
};

export default function Templates() {
  const navigate = useNavigate();
  const { selectedTemplate, setSelectedTemplate } = useResume();

  const templates = [
    { 
      id: 'template1', 
      name: 'Classic Professional', 
      desc: 'Traditional layout perfect for corporate roles. Clean sections with bold headers.',
      features: ['ATS-Optimized', 'Easy to scan', 'Professional'],
      component: <Template1 data={sampleData} />
    },
    { 
      id: 'template2', 
      name: 'Modern Minimalist', 
      desc: 'Contemporary design with subtle accents. Perfect for creative professionals.',
      features: ['Clean design', 'Modern look', 'Elegant'],
      component: <Template2 data={sampleData} />
    },
    { 
      id: 'template3', 
      name: 'Executive Bold', 
      desc: 'Stand out with strategic use of color and typography. For senior positions.',
      features: ['Eye-catching', 'Leadership', 'Confident'],
      component: <Template3 data={sampleData} />
    },

  ];

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    navigate('/builder');
  };

  return (
    <div className="min-h-screen relative">
      <GradientBackground />
      
      {/* Header */}
 <header className="border-b border-border/50 backdrop-blur-sm bg-background/50 sticky top-0 z-50">
  <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
    <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => navigate('/')}>
      <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
      <div className="min-w-0">
        <h1 className="text-base sm:text-xl md:text-2xl font-bold text-gradient truncate">
          Lofii Resume Builder
        </h1>
        <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
          A lofii digital product
        </p>
      </div>
    </div>
    <Button 
      onClick={() => navigate('/')} 
      variant="outline"
      className="text-xs sm:text-sm px-3 sm:px-4 py-2 flex-shrink-0"
    >
      <span className="hidden sm:inline">Back to Home</span>
      <span className="sm:hidden">Home</span>
    </Button>
  </div>
</header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="text-gradient">Perfect Template</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              All templates are ATS-friendly and designed by professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, idx) => (
              <Card 
                key={template.id}
                className={`p-6 card-hover cursor-pointer bg-card/50 backdrop-blur transition-all ${
                  selectedTemplate === template.id ? 'glow-border' : ''
                }`}
                onClick={() => handleSelectTemplate(template.id)}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {selectedTemplate === template.id && (
                  <div className="flex justify-end mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                )}
                
                <div 
                  className="relative w-full border border-border/50 hover:border-primary/50 transition-colors rounded overflow-hidden shadow-lg bg-white mb-4"
                  style={{ 
                    width: '260px',
                    height: '368px',
                    margin: '0 auto'
                  }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      transform: 'scale(0.327)',
                      transformOrigin: 'top left',
                      width: '794px',
                      minHeight: '100%'
                    }}
                  >
                    {template.component}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{template.desc}</p>
                
                <div className="flex flex-wrap gap-2">
                  {template.features.map((feature, i) => (
                    <span 
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Button 
                  className="w-full mt-4"
                  variant={selectedTemplate === template.id ? "default" : "outline"}
                >
                  {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


