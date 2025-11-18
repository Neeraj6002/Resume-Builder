import { ResumeData } from '@/types/resume';

interface Template5Props {
  data: ResumeData;
}

export default function Template5({ data }: Template5Props) {
  const formatDate = (date: any, isPresent: boolean) => {
  if (isPresent) return 'Present';
    if (!date || !date.month || !date.year) return '';
    return `${date.month} ${date.year}`;
  };

  return (
    <div
      id="resume-template"
      className="bg-white text-black flex"
      style={{
        fontFamily: "'Calibri', 'Arial', sans-serif",
        width: '794px',           // Exact A4 width
        minHeight: '1123px',      // Exact A4 height
        boxSizing: 'border-box',
        display: 'flex',
        overflow: 'hidden',       // Prevent any overflow
      }}
    >
      {/* Left Sidebar */}
      <aside className="w-1/3 bg-gradient-to-b from-cyan-700 to-cyan-900 text-white p-8 flex flex-col">
        <div className="mb-8">
          <h1 className="text-3xl font-bold leading-tight">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="h-1 w-20 bg-cyan-300 mt-3"></div>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-200 mb-3">Contact</h3>
          <div className="space-y-2 text-xs">
            <p className="break-all">{data.personalInfo.email || 'your.email@example.com'}</p>
            <p>{data.personalInfo.phone || 'Your Phone'}</p>
            <p>{data.personalInfo.location || 'Your Location'}</p>
            {data.personalInfo.linkedin && <p className="break-all">{data.personalInfo.linkedin}</p>}
          </div>
        </div>

        {/* Skills */}
               {(
          (data.skills.languages && data.skills.languages.length > 0) ||
          (data.skills.tools && data.skills.tools.length > 0) ||
          (data.skills.frameworks && data.skills.frameworks.length > 0)
        ) && (
          <div className="mb-8 flex-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-200 mb-3">Skills</h3>
            <div className="space-y-4 text-xs">
              {data.skills.languages?.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-1">Languages</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.languages.map((skill, i) => (
                      <span key={i} className="bg-cyan-800 px-2 py-1 rounded text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.frameworks?.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-1">Frameworks</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.frameworks.map((skill, i) => (
                      <span key={i} className="bg-cyan-800 px-2 py-1 rounded text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.tools?.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-1">Tools</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.tools.map((skill, i) => (
                      <span key={i} className="bg-cyan-800 px-2 py-1 rounded text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Coursework */}
        {data.coursework?.length > 0 && data.coursework.some(c => c?.trim()) && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-200 mb-3">Coursework</h3>
            <ul className="space-y-1.5 text-xs">
              {data.coursework
                .filter(c => c?.trim())
                .slice(0, 6)
                .map((course, i) => (
                  <li key={i}>• {course}</li>
                ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Right Main Content */}
      <main className="w-2/3 bg-white p-8 flex flex-col">
        {/* Objective */}
        {data.objective && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-cyan-900 border-b-4 border-cyan-900 pb-2 mb-4 uppercase tracking-wider">
              Professional Profile
            </h2>
            <p className="text-sm leading-relaxed text-gray-800">{data.objective}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-cyan-900 border-b-4 border-cyan-900 pb-2 mb-4 uppercase tracking-wider">
              Experience
            </h2>
            {data.experience.map((exp, i) => (
              <div key={exp.id} className="mb-6 last:mb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-base">{exp.title}</h3>
                    <p className="text-sm font-semibold text-cyan-700">{exp.company}</p>
                  </div>
                  {(exp.startDate?.year || exp.isPresent) && (
                    <span className="text-xs text-gray-600 whitespace-nowrap">
                      {formatDate(exp.startDate, false)} – {formatDate(exp.endDate, exp.isPresent)}
                    </span>
                  )}
                </div>
                <ul className="space-y-1 ml-4">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-xs leading-relaxed text-gray-700 relative before:content-[''] before:absolute before:left-[-12px] before:top-[6px] before:w-1 before:h-1 before:bg-cyan-600 before:rounded-full">
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
            <h2 className="text-xl font-bold text-cyan-900 border-b-4 border-cyan-900 pb-2 mb-4 uppercase tracking-wider">
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-5 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base">{edu.degree}</h3>
                    <p className="text-sm text-gray-700">
                      {edu.institution}
                      {edu.location && `, ${edu.location}`}
                    </p>
                  </div>
                  {(edu.startDate?.year || edu.isPresent) && (
                    <span className="text-xs text-gray-600 whitespace-nowrap">
                      {formatDate(edu.startDate, false)} – {formatDate(edu.endDate, edu.isPresent)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-cyan-900 border-b-4 border-cyan-900 pb-2 mb-4 uppercase tracking-wider">
              Projects
            </h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-5 last:mb-0">
                <h3 className="font-bold text-sm text-cyan-800">{project.title}</h3>
                <p className="text-xs leading-relaxed text-gray-700 mt-1">{project.description}</p>
                {project.technologies?.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {project.technologies.join(' • ')}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {data.certifications?.length > 0 && data.certifications.some(c => c?.trim()) && (
          <section>
            <h2 className="text-xl font-bold text-cyan-900 border-b-4 border-cyan-900 pb-2 mb-4 uppercase tracking-wider">
              Certifications
            </h2>
            <ul className="space-y-1.5">
              {data.certifications.filter(c => c?.trim()).map((cert, i) => (
                <li key={i} className="text-xs text-gray-700">• {cert}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}