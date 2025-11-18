import { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeData } from '@/types/resume';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    github: '',
  },
  objective: '',
  education: [],
  experience: [],
  skills: {
    languages: [],
    frameworks: [],
    tools: [],
    other: [],
  },
  projects: [],
  certifications: [],
  coursework: [],
};

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('template2');

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, selectedTemplate, setSelectedTemplate }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
