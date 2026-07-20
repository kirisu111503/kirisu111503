import React, { useState } from 'react';
import { Briefcase, Building2, ChevronDown, GraduationCap, Shield } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const EXPERIENCE = [
  {
    period: 'July 2026 - Present',
    title: 'Junior Software Developer',
    organization: 'University Department',
    type: 'Current role',
    protected: true,
    description:
      'Anonymized software development role for a university department, focused on backend workflows, structured data, and document-processing support.',
    details: [
      'Building backend features and system workflows so department processes can be handled through structured application flows.',
      'Working with relational database access patterns to keep records organized, validated, and reusable across the system.',
      'Contributing to OCR-assisted and LLM-assisted document-processing workflows that make extracted information easier to review.',
      'Supporting authentication, validation, uploads, real-time updates, performance controls, and backend reliability practices for safer system behavior.',
      'Keeping organization names, internal system names, source code, specifications, and implementation details anonymized for confidentiality.',
    ],
    stack: [
      'Node.js',
      'TypeScript',
      'NestJS',
      'Express',
      'Prisma',
      'PostgreSQL',
      'OCR workflows',
      'LLM-assisted processing',
    ],
  },
  {
    period: 'February 2026 - April 2026',
    title: 'Extension Services Intern',
    organization: 'CSU - CCIS Extension Services',
    type: 'Internship',
    protected: false,
    description:
      'Internship supporting extension services operations, documentation, file organization, and limited technical exposure to extension services software.',
    details: [
      'Assisted with documentation and file organization so extension services materials were easier to prepare, find, and maintain.',
      'Observed backend development concepts and team tooling used in extension services software.',
      'Supported program materials and technical coordination tasks that helped the team keep internship-period activities organized.',
    ],
    stack: ['Documentation', 'File organization', 'Administrative support', 'Technical exposure'],
  },
];

const EDUCATION = {
  period: 'Graduated June 18, 2026',
  title: 'Bachelor of Science in Computer Science',
  organization: 'Caraga State University - Main Campus',
  college: 'College of Computing and Information Sciences',
  details: [
    'Studied software development, algorithms, system design, and database architecture.',
    'Built foundations in object-oriented programming, web technologies, artificial intelligence, and data structures.',
  ],
};

export default function Timeline() {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpanded = (key) => {
    setExpandedItems((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  return (
    <section id="timeline" className="border-b border-palette-line bg-palette-paper py-16 sm:py-20">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="section-kicker">Experience</p>
            <h2 className="section-title mt-3">Recent roles and academic background.</h2>
            <p className="section-copy mt-4">
              A compact view of where I have been applying software development, systems thinking,
              and documentation work.
            </p>
          </div>

          <div className="space-y-5">
            {EXPERIENCE.map((item) => {
              const itemKey = `${item.period}-${item.title}`;
              const isExpanded = Boolean(expandedItems[itemKey]);

              return (
              <article key={itemKey} className="panel p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-palette-cerulean">{item.period}</p>
                    <h3 className="mt-2 flex items-center gap-2 text-xl font-semibold text-palette-ink">
                      <Briefcase className="h-5 w-5 text-palette-salmon" />
                      {item.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-2 text-sm text-palette-muted">
                      <Building2 className="h-4 w-4" />
                      {item.organization}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      <span className="tag">{item.type}</span>
                      {item.protected && (
                        <span className="tag">
                          <Shield className="mr-1.5 h-3.5 w-3.5" />
                          NDA protected
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleExpanded(itemKey)}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-palette-line bg-white px-3 py-1.5 text-xs font-semibold text-palette-ink transition hover:border-palette-cerulean hover:text-palette-cerulean focus-visible:ring-2 focus-visible:ring-palette-cerulean focus-visible:ring-offset-2 sm:w-auto"
                      aria-expanded={isExpanded}
                      aria-controls={`${itemKey}-details`}
                    >
                      {isExpanded ? 'Hide details' : 'View details'}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                {item.stack && (
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-palette-line pt-4">
                    {item.stack.map((tool) => (
                      <span key={tool} className="tag">
                        {tool}
                      </span>
                    ))}
                  </div>
                )}

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`${itemKey}-details`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-5">
                        <p className="section-copy">{item.description}</p>
                        <ul className="mt-4 space-y-2">
                          {item.details.map((detail) => (
                            <li key={detail} className="flex gap-3 text-sm leading-6 text-palette-muted">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-palette-cerulean" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
              );
            })}

            <article className="soft-panel p-6">
              <p className="text-sm font-semibold text-palette-cerulean">{EDUCATION.period}</p>
              <h3 className="mt-2 flex items-center gap-2 text-xl font-semibold text-palette-ink">
                <GraduationCap className="h-5 w-5 text-palette-salmon" />
                {EDUCATION.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-palette-muted">{EDUCATION.organization}</p>
              <p className="mt-1 text-sm text-palette-muted">{EDUCATION.college}</p>
              <ul className="mt-4 space-y-2">
                {EDUCATION.details.map((detail) => (
                  <li key={detail} className="flex gap-3 text-sm leading-6 text-palette-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-palette-salmon" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
