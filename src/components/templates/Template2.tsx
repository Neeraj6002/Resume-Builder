import { ResumeData } from '@/types/resume';

interface Template2Props {
  data: ResumeData;
}

export default function Template2({ data }: Template2Props) {
  const formatDate = (date: any, isPresent: boolean) => {
    if (isPresent) return 'Present';
    if (!date || !date.month || !date.year) return '';
    return `${date.month.substring(0, 3)} ${date.year}`;
  };

  return (
    <div
      id="resume-template"
      className="bg-white text-black"
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        width: '794px',
        minHeight: '1123px',
        padding: '48px 56px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
      }}
    >
      {/* Header */}
      <header className="mb-8" style={{ maxWidth: '100%' }}>
        <h1 className="text-4xl font-light tracking-wide mb-2" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-3 text-xs text-gray-600" style={{ maxWidth: '100%' }}>
          {data.personalInfo.email && <span style={{ wordWrap: 'break-word', overflowWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%' }}>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && (
            <>
              <span>•</span>
              <span style={{ wordWrap: 'break-word', overflowWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%' }}>{data.personalInfo.phone}</span>
            </>
          )}
          {data.personalInfo.location && (
            <>
              <span>•</span>
              <span style={{ wordWrap: 'break-word', overflowWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%' }}>{data.personalInfo.location}</span>
            </>
          )}
          {data.personalInfo.linkedin && (
            <>
              <span>•</span>
              <span style={{ wordWrap: 'break-word', overflowWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%' }}>{data.personalInfo.linkedin}</span>
            </>
          )}
          {data.personalInfo.github && (
            <>
              <span>•</span>
              <span style={{ wordWrap: 'break-word', overflowWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%' }}>{data.personalInfo.github}</span>
            </>
          )}
          {data.personalInfo.portfolio && (
            <>
              <span>•</span>
              <span style={{ wordWrap: 'break-word', overflowWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%' }}>{data.personalInfo.portfolio}</span>
            </>
          )}
        </div>
      </header>

      {/* Objective */}
      {data.objective && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2 pb-1 border-b border-gray-300">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-700" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{data.objective}</p>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-4 pb-1 border-b border-gray-300">
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-5 last:mb-0">
              <div className="flex justify-between items-start gap-8">
                <div className="flex-1" style={{ wordWrap: 'break-word', overflowWrap: 'break-word', minWidth: 0 }}>
                  <h3 className="font-semibold text-sm" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{edu.institution}</h3>
                  <p className="text-sm text-gray-600" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{edu.degree}</p>
                </div>
                <div className="text-right text-xs text-gray-600" style={{ whiteSpace: 'nowrap' }}>
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2 pb-1 border-b border-gray-300">
            Relevant Coursework
          </h2>
          <p className="text-sm leading-relaxed text-gray-700" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{data.coursework}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-4 pb-1 border-b border-gray-300">
            Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-6 last:mb-0">
              <div className="flex justify-between items-start gap-8">
                <div className="flex-1" style={{ wordWrap: 'break-word', overflowWrap: 'break-word', minWidth: 0 }}>
                  <h3 className="font-semibold text-sm" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{exp.company}</h3>
                  <p className="text-sm text-gray-600" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{exp.title}</p>
                </div>
                <div className="text-right text-xs text-gray-600" style={{ whiteSpace: 'nowrap' }}>
                  {exp.location && <p>{exp.location}</p>}
                  {(exp.startDate?.year || exp.isPresent) && (
                    <p>{formatDate(exp.startDate, false)} – {formatDate(exp.endDate, exp.isPresent)}</p>
                  )}
                </div>
              </div>
              <ul className="space-y-1 mt-2">
                {exp.description.map((desc, idx) => (
                  <li
                    key={idx}
                    className="text-xs leading-relaxed text-gray-700 pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-gray-500"
                    style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                  >
                    {desc}
                  </li>
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3 pb-1 border-b border-gray-300">
              Technical Skills
            </h2>
            <div className="text-sm space-y-1">
              {languages !== '' && (
                <p style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  <span className="font-semibold">Languages:</span> {languages}
                </p>
              )}
              {frameworks !== '' && (
                <p style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  <span className="font-semibold">Frameworks:</span> {frameworks}
                </p>
              )}
              {tools !== '' && (
                <p style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  <span className="font-semibold">Developer Tools:</span> {tools}
                </p>
              )}
            </div>
          </section>
        );
      })()}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3 pb-1 border-b border-gray-300">
            Projects
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4 last:mb-0">
              <h3 className="font-semibold text-sm" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{project.title}</h3>
              <p className="text-xs leading-relaxed text-gray-700 mt-1" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{project.description}</p>
              {project.technologies?.length > 0 && (
                <p className="text-xs text-gray-600 mt-1" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2 pb-1 border-b border-gray-300">
            Certifications
          </h2>
          <p className="text-sm leading-relaxed text-gray-700" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>{data.certifications}</p>
        </section>
      )}
    </div>
  );
}
