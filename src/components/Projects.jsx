import React, { useCallback, useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Lock,
  Maximize2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const PROJECTS = [
  {
    id: 1,
    title: 'StoryLine',
    subtitle: 'Personal story timeline and eBook planning app',
    category: 'Full-stack web app',
    year: '2026',
    access: 'Private repository',
    repository: null,
    demo: 'https://story-timeline-ebook.vercel.app/',
    demoLabel: 'Visit live app',
    description:
      'A writing tool for planning story timelines, managing plot elements, and keeping narrative notes organized through a production web interface.',
    outcomes: [
      'Gives writers one structured workspace for story timelines, plot elements, and project notes.',
      'Supports authenticated sessions with relational storage so story data can be saved and revisited.',
      'Provides a live deployed version that can be opened, tested, and reviewed outside the local development environment.',
    ],
    contribution: [
      'Built timeline and story-element workflows for writers planning long-form projects.',
      'Implemented authentication-aware application flow with a backend and relational storage.',
      'Prepared a deployed Vercel application with practical project structure and responsive UI.',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'JWT auth'],
    images: ['/story_line_img/story_line_p1.png', '/story_line_img/story_line_p2.png'],
  },
  {
    id: 2,
    title: 'Ping: Connection Linked',
    subtitle: 'Sci-fi mystery visual novel',
    category: 'Game and terminal UI',
    year: '2026',
    access: 'Public repository',
    repository: 'https://github.com/kirisu111503/Ping-Connection-Linked',
    release: 'https://github.com/kirisu111503/Ping-Connection-Linked/releases/tag/v1.1',
    demo: 'https://christ111503.itch.io/ping-connection-linked-setup-v10',
    demoLabel: 'Play on itch.io',
    description:
      'An interactive visual novel told through a station messaging interface, combining narrative pacing with custom terminal-style game UI.',
    outcomes: [
      'Creates a playable story experience with persistent progress across sessions.',
      'Uses terminal-style presentation, audio, and animated visuals to reinforce the sci-fi mystery tone.',
      'Packages the game with public source, release, and itch.io access for easier review and distribution.',
    ],
    contribution: [
      'Built the game loop, UI rendering, input handling, and audio flow in Python and Pygame.',
      'Integrated OpenCV for animated visual backgrounds and atmospheric terminal presentation.',
      'Used JSON persistence for player progress, logs, and story state.',
    ],
    stack: ['Python', 'Pygame', 'OpenCV', 'JSON persistence', 'Win32 window controls'],
    images: [
      '/ping_connection_img/ping_connection_p1.png',
      '/ping_connection_img/ping_connection_p2.png',
      '/ping_connection_img/ping_connection_p3.png',
      '/ping_connection_img/ping_connection_p4.png',
      '/ping_connection_img/ping_connection_p5.png',
      '/ping_connection_img/ping_connection_p6.png',
    ],
  },
];

export default function Projects() {
  const [activeImageIndices, setActiveImageIndices] = useState({ 1: 0, 2: 0 });
  const [expandedProjectIds, setExpandedProjectIds] = useState({});
  const [lightbox, setLightbox] = useState(null);

  const activeProject = lightbox ? PROJECTS.find((project) => project.id === lightbox.projectId) : null;

  const toggleProjectDetails = useCallback((projectId) => {
    setExpandedProjectIds((previous) => ({
      ...previous,
      [projectId]: !previous[projectId],
    }));
  }, []);

  const setSlide = useCallback((projectId, imageIndex) => {
    setActiveImageIndices((previous) => ({ ...previous, [projectId]: imageIndex }));
  }, []);

  const nextSlide = useCallback((projectId) => {
    const project = PROJECTS.find((item) => item.id === projectId);
    if (!project) return;
    setActiveImageIndices((previous) => ({
      ...previous,
      [projectId]: ((previous[projectId] || 0) + 1) % project.images.length,
    }));
  }, []);

  const previousSlide = useCallback((projectId) => {
    const project = PROJECTS.find((item) => item.id === projectId);
    if (!project) return;
    setActiveImageIndices((previous) => ({
      ...previous,
      [projectId]: ((previous[projectId] || 0) - 1 + project.images.length) % project.images.length,
    }));
  }, []);

  const nextLightboxImage = useCallback(() => {
    if (!lightbox || !activeProject) return;
    setLightbox((previous) => ({
      ...previous,
      imageIndex: (previous.imageIndex + 1) % activeProject.images.length,
    }));
  }, [activeProject, lightbox]);

  const previousLightboxImage = useCallback(() => {
    if (!lightbox || !activeProject) return;
    setLightbox((previous) => ({
      ...previous,
      imageIndex: (previous.imageIndex - 1 + activeProject.images.length) % activeProject.images.length,
    }));
  }, [activeProject, lightbox]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (document.hidden || lightbox) return;

      setActiveImageIndices((previous) => {
        const updated = { ...previous };

        PROJECTS.forEach((project) => {
          if (project.images.length > 1) {
            updated[project.id] = ((previous[project.id] || 0) + 1) % project.images.length;
          }
        });

        return updated;
      });
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, [lightbox]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!lightbox) return;
      if (event.key === 'Escape') setLightbox(null);
      if (event.key === 'ArrowRight') nextLightboxImage();
      if (event.key === 'ArrowLeft') previousLightboxImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, nextLightboxImage, previousLightboxImage]);

  return (
    <section id="projects" className="border-b border-palette-line bg-palette-surface py-16 sm:py-20">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="section-kicker">Selected Work</p>
            <h2 className="section-title mt-3">Projects with clear purpose and working interfaces.</h2>
          </div>
          <a
            href="https://github.com/kirisu111503"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary w-fit"
          >
            More on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-6">
          {PROJECTS.map((project) => {
            const activeIndex = activeImageIndices[project.id] || 0;
            const hasManyImages = project.images.length > 1;
            const isExpanded = Boolean(expandedProjectIds[project.id]);
            const detailsId = `project-${project.id}-details`;

            return (
              <article key={project.id} className="panel overflow-hidden">
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="tag">{project.category}</span>
                        <span className="tag">{project.year}</span>
                        <span className="tag">
                          {project.repository ? <Github className="mr-1.5 h-3.5 w-3.5" /> : <Lock className="mr-1.5 h-3.5 w-3.5" />}
                          {project.access}
                        </span>
                      </div>

                      <h3 className="mt-5 text-2xl font-semibold text-palette-ink">{project.title}</h3>
                      <p className="mt-1 text-sm font-medium text-palette-cerulean">{project.subtitle}</p>
                    </div>

                    <div className="flex flex-wrap gap-3 lg:justify-end">
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary">
                          {project.demoLabel}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {project.repository && (
                        <a href={project.repository} target="_blank" rel="noreferrer" className="btn-secondary">
                          Source
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.release && (
                        <a href={project.release} target="_blank" rel="noreferrer" className="btn-secondary">
                          Release
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleProjectDetails(project.id)}
                        className="btn-secondary"
                        aria-expanded={isExpanded}
                        aria-controls={detailsId}
                      >
                        {isExpanded ? 'Hide details' : 'View details'}
                        <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div className={`mt-7 grid gap-6 border-t border-palette-line pt-6 ${isExpanded ? 'lg:grid-cols-[1.05fr_0.95fr]' : ''}`}>
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-palette-line bg-palette-blueSoft">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={`${project.id}-${activeIndex}`}
                            src={project.images[activeIndex]}
                            alt={`${project.title} screenshot ${activeIndex + 1}`}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0.5 }}
                            transition={{ duration: 0.18 }}
                            className="h-full w-full object-cover object-top"
                          />
                        </AnimatePresence>

                        <button
                          type="button"
                          onClick={() => setLightbox({ projectId: project.id, imageIndex: activeIndex })}
                          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/80 bg-white/90 text-palette-ink shadow-sm transition hover:text-palette-cerulean"
                          aria-label={`Open ${project.title} screenshot`}
                        >
                          <Maximize2 className="h-4 w-4" />
                        </button>

                        {hasManyImages && (
                          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => previousSlide(project.id)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/80 bg-white/90 text-palette-ink shadow-sm transition hover:text-palette-cerulean"
                              aria-label={`Previous ${project.title} screenshot`}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-palette-muted shadow-sm">
                              {activeIndex + 1} / {project.images.length}
                            </span>
                            <button
                              type="button"
                              onClick={() => nextSlide(project.id)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/80 bg-white/90 text-palette-ink shadow-sm transition hover:text-palette-cerulean"
                              aria-label={`Next ${project.title} screenshot`}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        )}

                        {hasManyImages && (
                          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/50" aria-hidden="true">
                            <motion.div
                              key={`${project.id}-${activeIndex}-timer`}
                              initial={{ width: '0%' }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 10, ease: 'linear' }}
                              className="h-full bg-palette-cerulean"
                            />
                          </div>
                        )}
                      </div>

                      {hasManyImages && (
                        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                          {project.images.map((image, index) => (
                            <button
                              key={image}
                              type="button"
                              onClick={() => setSlide(project.id, index)}
                              className={`h-14 w-20 shrink-0 overflow-hidden rounded-md border transition ${
                                index === activeIndex ? 'border-palette-cerulean' : 'border-palette-line opacity-70 hover:opacity-100'
                              }`}
                              aria-label={`Show ${project.title} screenshot ${index + 1}`}
                            >
                              <img src={image} alt="" className="h-full w-full object-cover object-top" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          id={detailsId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div>
                            <p className="section-copy">{project.description}</p>

                            <div className="mt-6 border-l-2 border-palette-cerulean pl-4">
                              <h4 className="text-sm font-semibold text-palette-ink">Outcome</h4>
                              <ul className="mt-3 space-y-2">
                                {project.outcomes.map((item) => (
                                  <li key={item} className="flex gap-3 text-sm leading-6 text-palette-muted">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-palette-cerulean" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mt-6">
                              <h4 className="text-sm font-semibold text-palette-ink">Contribution</h4>
                              <ul className="mt-3 space-y-2">
                                {project.contribution.map((item) => (
                                  <li key={item} className="flex gap-3 text-sm leading-6 text-palette-muted">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-palette-salmon" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                              {project.stack.map((item) => (
                                <span key={item} className="tag">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-palette-ink/90 p-4 backdrop-blur"
            onClick={() => setLightbox(null)}
          >
            <div className="w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
              <div className="mb-3 flex items-center justify-between gap-4 text-white">
                <div>
                  <p className="text-sm font-semibold">{activeProject.title}</p>
                  <p className="text-xs text-white/70">
                    {lightbox.imageIndex + 1} / {activeProject.images.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Close screenshot preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative overflow-hidden rounded-lg bg-white">
                <img
                  src={activeProject.images[lightbox.imageIndex]}
                  alt={`${activeProject.title} large screenshot ${lightbox.imageIndex + 1}`}
                  className="max-h-[78vh] w-full object-contain"
                />

                {activeProject.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={previousLightboxImage}
                      className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg border border-palette-line bg-white text-palette-ink shadow-sm transition hover:text-palette-cerulean"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextLightboxImage}
                      className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg border border-palette-line bg-white text-palette-ink shadow-sm transition hover:text-palette-cerulean"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
