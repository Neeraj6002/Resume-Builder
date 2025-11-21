import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import GradientBackground from '@/components/GradientBackground';
import { useNavigate } from 'react-router-dom';
import { FileText, Sparkles, Download, Zap, Mail, Linkedin, Instagram } from 'lucide-react';
import logo from '@/assets/logo.png';
import Template1 from '@/components/templates/Template1';
import Template2 from '@/components/templates/Template2';
import Template3 from '@/components/templates/Template3';
import Template5 from '@/components/templates/Template5';
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
    languages: ['JavaScript', 'Python', 'TypeScript'],
    frameworks: ['React', 'Node.js', 'Django'],
    tools: ['Git', 'Docker', 'AWS'],
    other: [],
  },
  projects: [{
    id: '1',
    title: 'E-commerce Platform',
    description: 'Built a full-stack e-commerce platform using React and Node.js',
    technologies: ['React', 'Node.js', 'MongoDB'],
  }],
  certifications: ['AWS Certified Developer'],
  coursework: ['Data Structures', 'Algorithms', 'Database Systems'],
};

export default function Home() {
  const navigate = useNavigate();

  const features = [
    { icon: FileText, title: 'ATS-Friendly', desc: 'All templates pass ATS screening' },
    { icon: Sparkles, title: 'Beautiful Design', desc: 'Professional & eye-catching' },
    { icon: Download, title: 'Multiple Formats', desc: 'Export as PDF or DOCX' },
    { icon: Zap, title: 'Quick & Easy', desc: 'Build in minutes, not hours' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GradientBackground />
      
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">

          {/* LEFT → Logo + Text */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src={logo} 
              alt="Logo" 
              className="w-7 h-7 sm:w-10 sm:h-10" 
            />
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gradient">
                Resume Builder
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                lofii digital product
              </p>
            </div>
          </div>

          {/* RIGHT → Button (Hidden on mobile) */}
          <Button
            onClick={() => navigate('/builder')}
            size="lg"
            className="glow-border hidden sm:block"
          >
            Create Resume
          </Button>

        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-10 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Build Your Perfect Resume in{' '}
            <span className="text-gradient block sm:inline">Minutes</span>
          </h2>
          <p className="text-sm sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Create professional, ATS-friendly resumes with our beautiful templates. 
            No design skills needed. Download as PDF or DOCX instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button 
              onClick={() => navigate('/builder')} 
              size="lg" 
              className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 glow-border w-full sm:w-auto"
            >
              Create Resume
            </Button>
            <Button 
              onClick={() => navigate('/templates')} 
              variant="outline" 
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
            >
              View Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <Card key={idx} className="p-6 card-hover bg-card/50 backdrop-blur">
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Land Your Dream Job?
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Start building your professional resume now. It's free and takes less than 5 minutes.
          </p>
          <Button 
            onClick={() => navigate('/builder')} 
            size="lg"
            className="text-lg px-8 py-6 animate-glow-pulse"
          >
            Create Your Resume
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 backdrop-blur-sm bg-background/50 py-8 sm:py-12 mt-20">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-3">
                <img src={logo} alt="Lofii Logo" className="h-8 w-8" />
                <h3 className="text-lg font-bold text-gradient">Lofii</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Create professional resumes in minutes with our easy-to-use builder.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 text-foreground">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => navigate('/')} className="hover:text-foreground transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/builder')} className="hover:text-foreground transition-colors">
                    Resume Builder
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/templates')} className="hover:text-foreground transition-colors">
                    Templates
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 text-foreground">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://lofiicreations.netlify.app/" className="hover:text-foreground transition-colors">
                    Visit Us
                  </a>
                </li>

                <li>
                  <a href="mailto:lofiidesigns@gmail.com" className="hover:text-foreground transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3 text-foreground">Connect With Us</h4>
              <div className="space-y-3">
                <a 
                  href="mailto:lofiidesigns@gmail.com" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors justify-center sm:justify-start"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">lofiidesigns@gmail.com</span>
                </a>
                <div className="flex gap-3 justify-center sm:justify-start">
                  <a  
                    href="https://www.linkedin.com/in/lofii-creations-52978a396/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  
                  <a   
                    href="https://www.instagram.com/lofii_creations?igsh=MTIxMXNjNmN2Y2docQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border/50 pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <p className="text-xs sm:text-sm text-muted-foreground ">
                &copy; 2025 Lofii Resume Builder. A lofii digital product. All rights reserved.
              </p>
              <div className="flex gap-4 text-xs sm:text-sm text-muted-foreground">

              </div>
            </div>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
