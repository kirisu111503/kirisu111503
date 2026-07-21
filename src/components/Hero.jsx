import React from 'react';
import { ArrowDown, ArrowUpRight, CheckCircle2, Github, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import ProfilePhoto from './ProfilePhoto';

const FOCUS_AREAS = [
  'Backend workflows',
  'Database-backed web apps',
  'OCR and document automation',
];

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-palette-line pt-32 sm:pt-32">
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-palette-salmon via-palette-wheat to-palette-cerulean" />

      <div className="section-shell grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className="section-kicker">Junior Software Developer</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-normal text-palette-ink sm:text-5xl">
            I build practical software systems that are clear, maintainable, and useful.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-palette-muted sm:text-lg">
            I am Christian A. Isiderio, a computer science graduate focused on web applications,
            backend logic, database workflows, OCR tools, and interactive software.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              View Projects
              <ArrowDown className="h-4 w-4" />
            </a>
            <a href="mailto:christian.isiderio101@gmail.com" className="btn-secondary">
              Email Me
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/kirisu111503"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              GitHub
              <Github className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {FOCUS_AREAS.map((item) => (
              <div key={item} className="flex items-start gap-2 border-l-2 border-palette-sand pl-3 text-sm text-palette-muted">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-palette-cerulean" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="panel group overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-palette-steel/20"
        >
          <div className="grid grid-cols-5">
            <div className="h-3 bg-palette-salmon transition-all duration-300 group-hover:h-4" />
            <div className="h-3 bg-palette-sand transition-all duration-300 group-hover:h-4" />
            <div className="h-3 bg-palette-wheat transition-all duration-300 group-hover:h-4" />
            <div className="h-3 bg-palette-steel transition-all duration-300 group-hover:h-4" />
            <div className="h-3 bg-palette-cerulean transition-all duration-300 group-hover:h-4" />
          </div>

          <div className="p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <ProfilePhoto
                buttonClassName="rounded-lg border border-palette-line"
                imageClassName="h-28 w-28 object-cover"
              />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-palette-cerulean">Available for roles</p>
                <h2 className="mt-2 text-2xl font-semibold text-palette-ink">Christian A. Isiderio</h2>
                <p className="mt-1 text-sm text-palette-muted">Philippines-based developer</p>
              </div>
            </div>

            <dl className="mt-7 grid gap-4 border-t border-palette-line pt-6 sm:grid-cols-2">
              <div className="rounded-md transition duration-200 hover:bg-palette-blueSoft/50 sm:-m-2 sm:p-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-palette-muted">Current Role</dt>
                <dd className="mt-1 text-sm font-semibold text-palette-ink">Junior Software Developer</dd>
              </div>
              <div className="rounded-md transition duration-200 hover:bg-palette-blueSoft/50 sm:-m-2 sm:p-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-palette-muted">Primary Stack</dt>
                <dd className="mt-1 text-sm font-semibold text-palette-ink">NestJS, TypeScript, PostgreSQL</dd>
              </div>
              <div className="rounded-md transition duration-200 hover:bg-palette-blueSoft/50 sm:-m-2 sm:p-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-palette-muted">Degree</dt>
                <dd className="mt-1 text-sm font-semibold text-palette-ink">BS Computer Science</dd>
              </div>
              <div className="rounded-md transition duration-200 hover:bg-palette-blueSoft/50 sm:-m-2 sm:p-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-palette-muted">Contact</dt>
                <dd className="mt-1">
                  <a href="#contact" className="inline-flex items-center gap-1 text-sm font-semibold text-palette-cerulean transition hover:text-palette-ink">
                    Start a conversation
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
