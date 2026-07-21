import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ProfilePhoto from './ProfilePhoto';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#timeline' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (event, href) => {
    event.preventDefault();
    const sectionId = href.slice(1);
    const target = document.getElementById(sectionId);

    setMobileOpen(false);
    if (!target) return;

    window.history.pushState(null, '', href);
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }, 120);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);

      const current = ['hero', 'about', 'projects', 'skills', 'timeline', 'contact'].find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });

      if (current) setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition ${
        scrolled ? 'border-palette-line bg-palette-paper/95 shadow-sm backdrop-blur' : 'border-transparent bg-palette-paper/80 backdrop-blur'
      }`}
    >
      <div className="section-shell">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ProfilePhoto
              buttonClassName="h-10 w-10 rounded-lg border border-palette-line"
              imageClassName="h-full w-full object-cover"
            />
            <a
              href="#hero"
              onClick={(event) => scrollToSection(event, '#hero')}
              className="block text-left"
              aria-label="Christian A. Isiderio home"
            >
              <p className="text-sm font-semibold leading-tight text-palette-ink">Christian A. Isiderio</p>
              <p className="text-xs leading-tight text-palette-muted">Junior Software Developer</p>
            </a>
          </div>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => scrollToSection(event, link.href)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-palette-blueSoft text-palette-cerulean' : 'text-palette-muted hover:bg-white hover:text-palette-ink'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          <a href="#contact" onClick={(event) => scrollToSection(event, '#contact')} className="btn-primary hidden md:inline-flex">
            Contact
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-palette-line bg-white text-palette-ink md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-palette-line bg-palette-paper md:hidden"
          >
            <div className="section-shell py-3">
              <nav className="grid gap-1" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => scrollToSection(event, link.href)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-palette-muted hover:bg-white hover:text-palette-ink"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
