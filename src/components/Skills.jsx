import React, { useEffect, useState } from 'react';
import { Code2, Database, FileSearch, Server, Wrench } from 'lucide-react';

const SKILL_GROUPS = [
  {
    id: 'backend',
    label: 'Backend',
    icon: Server,
    summary: 'API design, server-side workflows, authentication, and application logic.',
    tools: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'JWT auth'],
  },
  {
    id: 'data',
    label: 'Data',
    icon: Database,
    summary: 'Relational data modeling, query design, and structured storage for real applications.',
    tools: ['PostgreSQL', 'SQL', 'Schema design', 'Data validation'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Code2,
    summary: 'Readable interfaces built with component structure, responsive layout, and clear states.',
    tools: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 'ocr',
    label: 'OCR and AI',
    icon: FileSearch,
    summary: 'Document extraction workflows that combine image preprocessing, OCR, and structured output.',
    tools: ['Tesseract OCR', 'OpenCV', 'Python', 'OpenAI API'],
  },
  {
    id: 'workflow',
    label: 'Workflow',
    icon: Wrench,
    summary: 'Development habits and tooling for steady delivery and maintainable collaboration.',
    tools: ['Git', 'GitHub', 'Postman', 'Docker basics'],
  },
];

export default function Skills() {
  const [activeId, setActiveId] = useState(SKILL_GROUPS[0].id);
  const activeGroup = SKILL_GROUPS.find((group) => group.id === activeId) || SKILL_GROUPS[0];
  const ActiveIcon = activeGroup.icon;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (document.hidden) return;

      setActiveId((currentId) => {
        const currentIndex = SKILL_GROUPS.findIndex((group) => group.id === currentId);
        const nextIndex = (currentIndex + 1) % SKILL_GROUPS.length;
        return SKILL_GROUPS[nextIndex].id;
      });
    }, 10000);

    return () => window.clearTimeout(timeoutId);
  }, [activeId]);

  return (
    <section id="skills" className="border-b border-palette-line bg-white py-16 sm:py-20">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="section-kicker">Skills</p>
            <h2 className="section-title mt-3">Technical areas I can contribute to.</h2>
            <p className="section-copy mt-4">
              I keep the stack honest: tools are grouped by how they help a project, not by inflated
              proficiency scores.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Skill categories">
              {SKILL_GROUPS.map((group) => {
                const Icon = group.icon;
                const active = activeId === group.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setActiveId(group.id)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      active
                        ? 'border-palette-cerulean bg-palette-blueSoft text-palette-cerulean'
                        : 'border-palette-line bg-palette-paper text-palette-muted hover:border-palette-cerulean hover:text-palette-ink'
                    }`}
                    role="tab"
                    aria-selected={active}
                  >
                    <Icon className="h-4 w-4" />
                    {group.label}
                  </button>
                );
              })}
            </div>

            <div className="panel p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-palette-salmonSoft p-3 text-palette-ink">
                  <ActiveIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-palette-ink">{activeGroup.label}</h3>
                  <p className="section-copy mt-2">{activeGroup.summary}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {activeGroup.tools.map((tool) => (
                  <span key={tool} className="tag">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
