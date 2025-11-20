export interface DateInfo {
  month: string;
  year: string;
  day?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: DateInfo;
  endDate: DateInfo | { month: string; year: string } | null;
  isPresent: boolean;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: DateInfo;
  endDate: DateInfo | { month: string; year: string } | null;
  isPresent: boolean;
  description: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies?: string[];
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    portfolio?: string;
    github?: string;
  };
  objective: string;
  education: Education[];
  experience: Experience[];
  skills: {
    languages?: string;
    frameworks?: string;
    tools?: string;
    other?: string;
  };
  projects: Project[];
  certifications: string;  // Changed from string[] to string
  coursework: string;      // Changed from string[] to string
}

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= currentYear - 50; i--) {
    years.push(i.toString());
  }
  return years;
};