import { ResumeData } from '@/types/resume';

interface Template1Props {
  data: ResumeData;
}

export default function Template1({ data }: Template1Props) {
  const formatDate = (date: any, isPresent: boolean) => {
    if (isPresent) return 'Present';
    if (!date || !date.month || !date.year) return '';
    return `${date.month} ${date.year}`;
  };

  return (
    <div
      id="resume-template"
      className="bg-white text-black"
      style={{
        fontFamily: 'Arial, Helvetica, sans-serif',
        width: '794px',
        minHeight: '1123px',
        padding: '56px 64px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header className="text-center border-b-4 border-black pb-5 mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-sm text-gray-700 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
          {data.personalInfo.github && <span>{data.personalInfo.github}</span>}
          {data.personalInfo.portfolio && <span>{data.personalInfo.portfolio}</span>}
        </div>
      </header>

      {/* Objective */}
      {data.objective && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-3">Objective</h2>
          <p className="text-sm leading-relaxed">{data.objective}</p>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-4">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-5 last:mb-0">
              <div className="flex justify-between items-start gap-8">
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{edu.institution}</h3>
                  <p className="text-sm">{edu.degree}</p>
                </div>
                <div className="text-right text-sm">
                  {edu.location && <p>{edu.location}</p>}
                  {(edu.startDate?.year || edu.isPresent) && (
                    <p>{formatDate(edu.startDate, false)} – {formatDate(edu.endDate, edu.isPresent)}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Relevant Coursework */}
      {data.coursework && data.coursework.trim() && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-3">Relevant Coursework</h2>
          <p className="text-sm leading-relaxed">{data.coursework}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-4">Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-6 last:mb-0">
              <div className="flex justify-between items-start gap-8">
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{exp.company}</h3>
                  <p className="text-sm italic">{exp.title}</p>
                </div>
                <div className="text-right text-sm">
                  {exp.location && <p>{exp.location}</p>}
                  {(exp.startDate?.year || exp.isPresent) && (
                    <p>{formatDate(exp.startDate, false)} – {formatDate(exp.endDate, exp.isPresent)}</p>
                  )}
                </div>
              </div>
              <ul className="mt-2 ml-5 list-disc text-sm space-y-1">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Technical Skills */}
      {(() => {
        const languages = data.skills.languages?.trim() || '';
        const frameworks = data.skills.frameworks?.trim() || '';
        const tools = data.skills.tools?.trim() || '';
        
        const hasSkills = languages !== '' || frameworks !== '' || tools !== '';
        
        return hasSkills && (
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-3">
              Technical Skills
            </h2>
            <div className="text-sm space-y-1">
              {languages !== '' && (
                <p>
                  <span className="font-bold">Languages:</span> {languages}
                </p>
              )}
              {frameworks !== '' && (
                <p>
                  <span className="font-bold">Frameworks:</span> {frameworks}
                </p>
              )}
              {tools !== '' && (
                <p>
                  <span className="font-bold">Developer Tools:</span> {tools}
                </p>
              )}
            </div>
          </section>
        );
      })()}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-3">Projects</h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4 last:mb-0">
              <h3 className="font-bold text-sm">• {project.title}</h3>
              <p className="text-sm ml-6 leading-relaxed">{project.description}</p>
              {project.technologies?.length > 0 && (
                <p className="text-xs ml-6 text-gray-600 mt-1">
                  {project.technologies.join(' • ')}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.trim() && (
        <section>
          <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-3">Certifications</h2>
          <p className="text-sm leading-relaxed">{data.certifications}</p>
        </section>
      )}
    </div>
  );
}
