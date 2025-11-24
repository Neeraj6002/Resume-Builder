import { ResumeData } from '@/types/resume';

interface Template3Props {
  data: ResumeData;
}

export default function Template3({ data }: Template3Props) {
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
        fontFamily: 'Georgia, serif',
        width: '794px',
        minHeight: '1123px',
        padding: '0',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
      }}
    >
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 mb-6">
        <h1 className="text-4xl font-bold mb-2" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-sm flex flex-wrap gap-x-4 gap-y-1">
          {data.personalInfo.location && <span style={{ wordWrap: 'break-word', overflowWrap: 'break-word', wordBreak: 'break-word' }}>{data.personalInfo.location}</span>}
          {data.personalInfo.phone && <span style={{ wordWrap: 'break-word', overflowWrap: 'break-word', wordBreak: 'break-word' }}>{data.personalInfo.phone}</span>}
          {data.personalInfo.email && <span style={{ wordWrap: 'break-word', overflowWrap: 'break-word', wordBreak: 'break-word' }}>{data.personalInfo.email}</span>}
          {data.personalInfo.linkedin && <span style={{ wordWrap: 'break-word', overflowWrap: 'break-word', wordBreak: 'break-word' }}>{data.personalInfo.linkedin}</span>}
          {data.personalInfo.github && <span style={{ wordWrap: 'break-word', overflowWrap: 'break-word', wordBreak: 'break-word' }}>{data.personalInfo.github}</span>}
          {data.personalInfo.portfolio && <span style={{ wordWrap: 'break-word', overflowWrap: 'break-word', wordBreak: 'break-word' }}>{data.personalInfo.portfolio}</span>}
        </div>
      </header>

      <main className="px-8 pb-8 flex-grow">
        {/* Objective */}
        {data.objective && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-3 pb-2 border-b-2 border-blue-900">
              Executive Summary
            </h2>
            <p className="text-sm leading-relaxed" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{data.objective}</p>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-900">
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-5 last:mb-0">
                <div className="flex justify-between items-start gap-8">
                  <div className="flex-1" style={{ wordWrap: 'break-word', overflowWrap: 'break-word', minWidth: 0 }}>
                    <h3 className="font-bold text-sm" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{edu.institution}</h3>
                    <p className="text-sm" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{edu.degree}</p>
                  </div>
                  <div className="text-right text-sm" style={{ whiteSpace: 'nowrap' }}>
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
            <h2 className="text-xl font-bold text-blue-900 mb-3 pb-2 border-b-2 border-blue-900">
              Relevant Coursework
            </h2>
            <p className="text-sm leading-relaxed" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{data.coursework}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-900">
              Professional Experience
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-6 last:mb-0">
                <div className="flex justify-between items-start gap-8">
                  <div className="flex-1" style={{ wordWrap: 'break-word', overflowWrap: 'break-word', minWidth: 0 }}>
                    <h3 className="font-bold text-sm" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{exp.company}</h3>
                    <p className="text-sm italic" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{exp.title}</p>
                  </div>
                  <div className="text-right text-sm" style={{ whiteSpace: 'nowrap' }}>
                    {exp.location && <p>{exp.location}</p>}
                    {(exp.startDate?.year || exp.isPresent) && (
                      <p>{formatDate(exp.startDate, false)} – {formatDate(exp.endDate, exp.isPresent)}</p>
                    )}
                  </div>
                </div>
                <ul className="mt-2 ml-5 list-disc text-sm space-y-1">
                  {exp.description.map((desc, i) => (
                    <li key={i} style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{desc}</li>
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
              <h2 className="text-xl font-bold text-blue-900 mb-3 pb-2 border-b-2 border-blue-900">
                Technical Skills
              </h2>
              <div className="text-sm space-y-1">
                {languages !== '' && (
                  <p style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                    <span className="font-bold">Languages:</span> {languages}
                  </p>
                )}
                {frameworks !== '' && (
                  <p style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                    <span className="font-bold">Frameworks:</span> {frameworks}
                  </p>
                )}
                {tools !== '' && (
                  <p style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
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
            <h2 className="text-xl font-bold text-blue-900 mb-3 pb-2 border-b-2 border-blue-900">
              Projects
            </h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-4 last:mb-0">
                <h3 className="font-bold text-sm" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>• {project.title}</h3>
                <p className="text-sm ml-6 leading-relaxed" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{project.description}</p>
                {project.technologies?.length > 0 && (
                  <p className="text-xs ml-6 text-gray-600 mt-1" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
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
            <h2 className="text-xl font-bold text-blue-900 mb-3 pb-2 border-b-2 border-blue-900">
              Certifications
            </h2>
            <p className="text-sm leading-relaxed" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{data.certifications}</p>
          </section>
        )}
      </main>
    </div>
  );
}
}
