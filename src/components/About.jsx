import React from 'react';
import { Database, FileSearch, Server, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const PRINCIPLES = [
  {
    title: 'Readable systems',
    description: 'I prefer straightforward architecture, named responsibilities, and code that a future teammate can follow.',
    icon: Server,
  },
  {
    title: 'Useful automation',
    description: 'I look for repetitive document, data, and workflow tasks that can be made faster and less error-prone.',
    icon: Wrench,
  },
  {
    title: 'Data awareness',
    description: 'I think through schemas, validations, and how information moves through an application.',
    icon: Database,
  },
  {
    title: 'Careful extraction',
    description: 'My OCR and AI work is strongest when the output is structured, reviewable, and practical for real users.',
    icon: FileSearch,
  },
];

export default function About() {
  return (
    <section id="about" className="border-b border-palette-line bg-white py-16 sm:py-20">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="section-kicker">About</p>
            <h2 className="section-title mt-3">A developer focused on practical, understandable systems.</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35 }}
            className="space-y-5"
          >
            <p className="section-copy">
              I am a junior software developer with experience in server-side logic, web interfaces,
              database workflows, and document automation. I like building software that solves a
              specific operational problem and remains easy to improve after the first version ships.
            </p>
            <p className="section-copy">
              My current work includes a software system for a university department. Because some
              details may be covered by confidentiality terms, this portfolio keeps that work anonymized
              and focuses on safe stack-level experience, implementation approach, and the technical
              habits I bring into a team.
            </p>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="border-t-2 border-palette-sand pt-4">
                <Icon className="h-5 w-5 text-palette-cerulean" />
                <h3 className="mt-4 text-base font-semibold text-palette-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-palette-muted">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
