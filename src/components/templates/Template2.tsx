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
      }}
    >
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-light tracking-wide mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-3 text-xs text-gray-600">
          <span>{data.personalInfo.email || 'your.email@example.com'}</span>
          <span>•</span>
          <span>{data.personalInfo.phone || 'Your Phone'}</span>
          <span>•</span>
          <span>{data.personalInfo.location || 'Your Location'}</span>
          {data.personalInfo.linkedin && (
            <>
              <span>•</span>
              <span>{data.personalInfo.linkedin}</span>
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
          <p className="text-sm leading-relaxed text-gray-700">{data.objective}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3 pb-1 border-b border-gray-300">
            Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-5 last:mb-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-semibold text-sm">{exp.title}</h3>
                {(exp.startDate?.year || exp.isPresent) && (
                  <span className="text-xs text-gray-600">
                    {formatDate(exp.startDate, false)} – {formatDate(exp.endDate, exp.isPresent)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {exp.company}
                {exp.location && `, ${exp.location}`}
              </p>
              <ul className="space-y-1">
                {exp.description.map((desc, idx) => (
                  <li
                    key={idx}
                    className="text-xs leading-relaxed text-gray-700 pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-gray-500"
                  >
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3 pb-1 border-b border-gray-300">
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4 last:mb-0">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-semibold text-sm">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">
                    {edu.institution}
                    {edu.location && `, ${edu.location}`}
                  </p>
                </div>
                {(edu.startDate?.year || edu.isPresent) && (
                  <span className="text-xs text-gray-600">
                    {formatDate(edu.startDate, false)} – {formatDate(edu.endDate, edu.isPresent)}
                  </span>
                )}
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
          <p className="text-sm leading-relaxed text-gray-700">{data.coursework}</p>
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
                <p>
                  <span className="font-semibold">Languages:</span> {languages}
                </p>
              )}
              {frameworks !== '' && (
                <p>
                  <span className="font-semibold">Frameworks:</span> {frameworks}
                </p>
              )}
              {tools !== '' && (
                <p>
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
              <h3 className="font-semibold text-sm">{project.title}</h3>
              <p className="text-xs leading-relaxed text-gray-700 mt-1">{project.description}</p>
              {project.technologies && (
                <p className="text-xs text-gray-600 mt-1">
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
          <p className="text-sm leading-relaxed text-gray-700">{data.certifications}</p>
        </section>
      )}
    </div>
  );
}