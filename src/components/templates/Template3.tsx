import { ResumeData } from '@/types/resume';

interface Template3Props {
  data: ResumeData;
}

export default function Template3({ data }: Template3Props) {
  const formatDate = (date: any, isPresent: boolean) => {
    if (isPresent) return 'PRESENT';
    if (!date || !date.month || !date.year) return '';
    return `${date.month.toUpperCase()} ${date.year}`;
  };

  return (
    <div
      id="resume-template"
      className="bg-white text-black"
      style={{
        fontFamily: 'Georgia, serif',
        width: '794px',           // Exact A4 width @96dpi
        minHeight: '1123px',      // Exact A4 height @96dpi
        padding: '0',             // No outer padding, handled inside
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header with accent */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 mb-6">
        <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-sm space-y-1">
          <p>
            {data.personalInfo.email || 'your.email@example.com'} |{' '}
            {data.personalInfo.phone || 'Your Phone'}
          </p>
          <p>{data.personalInfo.location || 'Your Location'}</p>
          {data.personalInfo.linkedin && <p>{data.personalInfo.linkedin}</p>}
        </div>
      </header>

      <main className="p-8 flex-grow">
        {/* Objective */}
        {data.objective && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-900">
              EXECUTIVE SUMMARY
            </h2>
            <p className="text-sm leading-relaxed">{data.objective}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-900">
              PROFESSIONAL EXPERIENCE
            </h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-6 last:mb-0">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-base">{exp.title}</h3>
                    <p className="text-sm font-semibold text-blue-800">{exp.company}</p>
                  </div>
                  <div className="text-xs text-right">
                    <p className="font-semibold">
                      {formatDate(exp.startDate, false)} – {formatDate(exp.endDate, exp.isPresent)}
                    </p>
                    {exp.location && <p>{exp.location}</p>}
                  </div>
                </div>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="text-sm leading-relaxed">{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-900">
              EDUCATION
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-4 last:mb-0 flex justify-between">
                <div>
                  <h3 className="font-bold text-base">{edu.degree}</h3>
                  <p className="text-sm">
                    {edu.institution}
                    {edu.location ? `, ${edu.location}` : ''}
                  </p>
                </div>
                {(edu.startDate?.year || edu.isPresent) && (
                  <p className="text-xs font-semibold">
                    {formatDate(edu.startDate, false)} – {formatDate(edu.endDate, edu.isPresent)}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

 {/* Technical Skills */}
{(() => {
  const getSkillString = (skill: any): string => {
    if (typeof skill === 'string') return skill;
    if (Array.isArray(skill)) return (skill as string[]).join(', ');
    return '';
  };
  
  const languages = getSkillString(data.skills.languages);
  const frameworks = getSkillString(data.skills.frameworks);
  const tools = getSkillString(data.skills.tools);
  
  const hasSkills = languages.trim() !== '' || frameworks.trim() !== '' || tools.trim() !== '';
  
  return hasSkills && (
    <section className="mb-8">
      <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-3">
        Technical Skills
      </h2>

      <div className="text-sm space-y-1">
        {languages.trim() !== '' && (
          <p>
            <span className="font-bold">Languages:</span> {languages}
          </p>
        )}

        {frameworks.trim() !== '' && (
          <p>
            <span className="font-bold">Frameworks:</span> {frameworks}
          </p>
        )}

        {tools.trim() !== '' && (
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
          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-900">
              KEY PROJECTS
            </h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-4 last:mb-0">
                <h3 className="font-bold text-sm">{project.title}</h3>
                <p className="text-sm leading-relaxed">{project.description}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}