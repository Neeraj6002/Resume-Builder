import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GradientBackground from '@/components/GradientBackground';
import { useResume } from '@/context/ResumeContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, Plus, Trash2, FileText } from 'lucide-react';
import { MONTHS, generateYears, Education, Experience, Project } from '@/types/resume';
import { toast } from 'sonner';
import Template1 from '@/components/templates/Template1';
import Template2 from '@/components/templates/Template2';
import Template3 from '@/components/templates/Template3';
import Template5 from '@/components/templates/Template5';
import { exportToPDF, exportToDocx, exportToPNG } from '@/utils/exportPdf';
import logo from '@/assets/logo.png';

const YEARS = generateYears();

const templates = [
  { id: 'template1', name: 'Classic Professional', component: Template1 },
  { id: 'template2', name: 'Modern Minimalist', component: Template2 },
  { id: 'template3', name: 'Executive Bold', component: Template3 },
  { id: 'template5', name: 'Two Column Pro', component: Template5 },
];

export default function Builder() {
  const [step, setStep] = useState(1);
  const { resumeData, setResumeData, selectedTemplate, setSelectedTemplate } = useResume();
  const navigate = useNavigate();

  const TemplateComponent = templates.find(t => t.id === selectedTemplate)?.component || Template1;

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value }
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      location: '',
      startDate: { month: '', year: '' },
      endDate: { month: '', year: '' },
      isPresent: false
    };
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEdu]
    });
  };

  const updateEducation = (id: string, field: string, value: any) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: { month: '', year: '' },
      endDate: { month: '', year: '' },
      isPresent: false,
      description: ['']
    };
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExp]
    });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: ''
    };
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject]
    });
  };

  const updateProject = (id: string, field: string, value: any) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    });
  };

  const removeProject = (id: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter(proj => proj.id !== id)
    });
  };

  const handleExport = async (type: 'pdf' | 'docx' | 'png') => {
    const userName = resumeData.personalInfo.fullName || 'Resume';
    try {
      if (type === 'pdf') {
        await exportToPDF('resume-template', 'resume', userName);
        toast.success('Resume exported as PDF!');
      } else if (type === 'docx') {
        await exportToDocx(resumeData, 'resume', userName);
        toast.success('Resume exported as DOC!');
      } else if (type === 'png') {
        await exportToPNG('resume-template', 'resume', userName);
        toast.success('Resume exported as PNG!');
      }
    } catch (error) {
      toast.error('Export failed. Please try again.');
    }
  };

  const nextStep = () => {
    if (step < 6) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div>
                <Label htmlFor="portfolio">Portfolio</Label>
                <Input
                  id="portfolio"
                  value={resumeData.personalInfo.portfolio}
                  onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                  placeholder="johndoe.com"
                />
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={resumeData.personalInfo.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  placeholder="github.com/johndoe"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Objective / Summary</h2>
            <div>
              <Label htmlFor="objective">Professional Summary</Label>
              <Textarea
                id="objective"
                value={resumeData.objective}
                onChange={(e) => setResumeData({ ...resumeData, objective: e.target.value })}
                placeholder="Write a brief professional summary..."
                rows={6}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Education</h2>
              <Button onClick={addEducation} size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add Education
              </Button>
            </div>
            {resumeData.education.map((edu) => (
              <Card key={edu.id} className="p-6 bg-card/50 backdrop-blur">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-foreground">Education Entry</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Institution *</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        placeholder="University Name"
                      />
                    </div>
                    <div>
                      <Label>Degree *</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={edu.location}
                        onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Select
                          value={edu.startDate.month}
                          onValueChange={(value) => updateEducation(edu.id, 'startDate', { ...edu.startDate, month: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {MONTHS.map((month) => (
                              <SelectItem key={month} value={month}>{month}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={edu.startDate.year}
                          onValueChange={(value) => updateEducation(edu.id, 'startDate', { ...edu.startDate, year: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {YEARS.map((year) => (
                              <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Select
                          value={edu.endDate.month}
                          onValueChange={(value) => updateEducation(edu.id, 'endDate', { ...edu.endDate, month: value })}
                          disabled={edu.isPresent}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {MONTHS.map((month) => (
                              <SelectItem key={month} value={month}>{month}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={edu.endDate.year}
                          onValueChange={(value) => updateEducation(edu.id, 'endDate', { ...edu.endDate, year: value })}
                          disabled={edu.isPresent}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {YEARS.map((year) => (
                              <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          id={`present-${edu.id}`}
                          checked={edu.isPresent}
                          onChange={(e) => updateEducation(edu.id, 'isPresent', e.target.checked)}
                          className="mr-2"
                        />
                        <Label htmlFor={`present-${edu.id}`} className="text-sm">Currently Studying</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Experience</h2>
              <Button onClick={addExperience} size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add Experience
              </Button>
            </div>
            {resumeData.experience.map((exp) => (
              <Card key={exp.id} className="p-6 bg-card/50 backdrop-blur">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-foreground">Experience Entry</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Job Title *</Label>
                      <Input
                        value={exp.title}
                        onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div>
                      <Label>Company *</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        placeholder="Tech Corp"
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Select
                          value={exp.startDate.month}
                          onValueChange={(value) => updateExperience(exp.id, 'startDate', { ...exp.startDate, month: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {MONTHS.map((month) => (
                              <SelectItem key={month} value={month}>{month}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={exp.startDate.year}
                          onValueChange={(value) => updateExperience(exp.id, 'startDate', { ...exp.startDate, year: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {YEARS.map((year) => (
                              <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Select
                          value={exp.endDate.month}
                          onValueChange={(value) => updateExperience(exp.id, 'endDate', { ...exp.endDate, month: value })}
                          disabled={exp.isPresent}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {MONTHS.map((month) => (
                              <SelectItem key={month} value={month}>{month}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={exp.endDate.year}
                          onValueChange={(value) => updateExperience(exp.id, 'endDate', { ...exp.endDate, year: value })}
                          disabled={exp.isPresent}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {YEARS.map((year) => (
                              <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          id={`present-exp-${exp.id}`}
                          checked={exp.isPresent}
                          onChange={(e) => updateExperience(exp.id, 'isPresent', e.target.checked)}
                          className="mr-2"
                        />
                        <Label htmlFor={`present-exp-${exp.id}`} className="text-sm">Currently Working</Label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Responsibilities</Label>
                    {exp.description.map((desc, idx) => (
                      <div key={idx} className="flex gap-2 mt-2">
                        <Input
                          value={desc}
                          onChange={(e) => {
                            const newDesc = [...exp.description];
                            newDesc[idx] = e.target.value;
                            updateExperience(exp.id, 'description', newDesc);
                          }}
                          placeholder="Describe your responsibility..."
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newDesc = exp.description.filter((_, i) => i !== idx);
                            updateExperience(exp.id, 'description', newDesc.length ? newDesc : ['']);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => updateExperience(exp.id, 'description', [...exp.description, ''])}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Responsibility
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Skills</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label>Programming Languages</Label>
                <Input
                  value={(resumeData.skills.languages || []).join(', ')}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    skills: { ...resumeData.skills, languages: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                  })}
                  placeholder="JavaScript, Python, Java"
                />
              </div>
              <div>
                <Label>Frameworks</Label>
                <Input
                  value={(resumeData.skills.frameworks || []).join(', ')}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    skills: { ...resumeData.skills, frameworks: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                  })}
                  placeholder="React, Node.js, Django"
                />
              </div>
              <div>
                <Label>Tools</Label>
                <Input
                  value={(resumeData.skills.tools || []).join(', ')}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    skills: { ...resumeData.skills, tools: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                  })}
                  placeholder="Git, Docker, AWS"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Projects & Certifications</h2>
              <Button onClick={addProject} size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </Button>
            </div>
            {resumeData.projects.map((proj) => (
              <Card key={proj.id} className="p-6 bg-card/50 backdrop-blur">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-foreground">Project</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProject(proj.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <div>
                    <Label>Project Title</Label>
                    <Input
                      value={proj.title}
                      onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                      placeholder="Project Name"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      placeholder="Describe the project..."
                      rows={3}
                    />
                  </div>
                </div>
              </Card>
            ))}
            <div className="mt-6">
              <Label>Certifications</Label>
              <Input
                value={resumeData.certifications.join(', ')}
                onChange={(e) => setResumeData({
                  ...resumeData,
                  certifications: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                })}
                placeholder="AWS Certified, Google Cloud Professional"
              />
            </div>
            <div>
              <Label>Relevant Coursework</Label>
              <Input
                value={resumeData.coursework.join(', ')}
                onChange={(e) => setResumeData({
                  ...resumeData,
                  coursework: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                })}
                placeholder="Data Structures, Machine Learning, Web Development"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <GradientBackground />
      
      {/* Header */}
  <header className="relative z-10 bg-background/80 backdrop-blur border-b border-border">
  <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
        <img src={logo} alt="Lofii Logo" className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0" />
        <div className="min-w-0">
          <h1 className="text-base sm:text-xl md:text-2xl font-bold text-foreground truncate">
            Lofii Resume Builder
          </h1>
          <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
            A lofii digital product
          </p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="flex-shrink-0 px-2 sm:px-4"
      >
        <ArrowLeft className="w-4 h-4 sm:mr-2" />
        <span className="hidden sm:inline">Back to Home</span>
        <span className="sm:hidden sr-only">Back</span>
      </Button>
    </div>
  </div>
</header>

      {/* Main Content - Responsive Layout */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Desktop: Side by side layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Template Selector */}
            <Card className="p-6 bg-card/80 backdrop-blur">
              <Label>Select Template</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>

            {/* Progress */}
            <Card className="p-6 bg-card/80 backdrop-blur">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">Step {step} of 6</span>
                <span className="text-sm font-medium text-foreground">
                  {['Personal Info', 'Objective', 'Education', 'Experience', 'Skills', 'Projects'][step - 1]}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${(step / 6) * 100}%` }}
                />
              </div>
            </Card>

            {/* Form Content */}
            <Card className="p-6 bg-card/80 backdrop-blur">
              {renderStepContent()}
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button onClick={prevStep} disabled={step === 1} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" /> Previous
              </Button>
              {step < 6 ? (
                <Button onClick={nextStep}>
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={() => handleExport('pdf')} className="bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" /> PDF
                  </Button>
                  <Button onClick={() => handleExport('docx')} variant="secondary">
                    <FileText className="w-4 h-4 mr-2" /> DOC
                  </Button>
                  <Button onClick={() => handleExport('png')} variant="outline">
                    <Download className="w-4 h-4 mr-2" /> PNG
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Live Preview - Desktop */}
          <div className="sticky top-8 h-fit">
            <div 
              className="bg-white shadow-xl mx-auto overflow-hidden border border-border/20 rounded"
              style={{ 
                width: '340px',
                height: '480px'
              }}
            >
              <div 
                style={{ 
                  transform: 'scale(0.428)',
                  transformOrigin: 'top left',
                  width: '794px',
                  minHeight: '1123px',
                  backgroundColor: '#ffffff'
                }}
              >
                <TemplateComponent data={resumeData} />
              </div>
            </div>
          </div>
        </div>

        {/* Tablet & Mobile: Stacked layout */}
        <div className="lg:hidden space-y-6">
          {/* Template Selector */}
          <Card className="p-6 bg-card/80 backdrop-blur">
            <Label>Select Template</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          {/* Progress */}
          <Card className="p-6 bg-card/80 backdrop-blur">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">Step {step} of 6</span>
              <span className="text-sm font-medium text-foreground">
                {['Personal Info', 'Objective', 'Education', 'Experience', 'Skills', 'Projects'][step - 1]}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </Card>

          {/* Form Content */}
          <Card className="p-6 bg-card/80 backdrop-blur">
            {renderStepContent()}
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button onClick={prevStep} disabled={step === 1} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            {step < 6 && (
              <Button onClick={nextStep}>
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          {/* Live Preview - Tablet/Mobile */}
          <div 
            className="bg-white shadow-xl mx-auto overflow-hidden border border-border/20 rounded"
            style={{ 
              width: '100%',
              maxWidth: '300px',
              height: '424px'
            }}
          >
            <div 
              style={{ 
                transform: 'scale(0.378)',
                transformOrigin: 'top left',
                width: '794px',
                minHeight: '1123px',
                backgroundColor: '#ffffff'
              }}
            >
              <TemplateComponent data={resumeData} />
            </div>
          </div>

          {/* Download Buttons - Mobile/Tablet */}
          {step === 6 && (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => handleExport('pdf')} className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </Button>
              <Button onClick={() => handleExport('docx')} variant="secondary" className="flex-1">
                <FileText className="w-4 h-4 mr-2" /> Download DOC
              </Button>
              <Button onClick={() => handleExport('png')} variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" /> Download PNG
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Hidden A4 portrait export container (794px × 1123px at 96 DPI) */}
      <div 
        id="resume-template-export"
        style={{ 
          position: 'absolute',
          left: '-9999px',
          top: 0,
          width: '794px',
          minHeight: '1123px',
          background: 'white'
        }}
      >
        <TemplateComponent data={resumeData} />
      </div>
    </div>
  );
}
