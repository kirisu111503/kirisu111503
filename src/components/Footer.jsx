import React from 'react';
import { ArrowUp, Facebook, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-palette-line bg-palette-paper py-8">
      <div className="section-shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-palette-ink">Christian A. Isiderio</p>
          <p className="mt-1 text-xs text-palette-muted">&copy; 2026. Junior Software Developer portfolio.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="mailto:christian.isiderio101@gmail.com"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-palette-line bg-white text-palette-muted transition hover:text-palette-cerulean"
            aria-label="Email Christian A. Isiderio"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/kirisu111503"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-palette-line bg-white text-palette-muted transition hover:text-palette-cerulean"
            aria-label="GitHub profile"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.facebook.com/christ111503"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-palette-line bg-white text-palette-muted transition hover:text-palette-cerulean"
            aria-label="Facebook profile"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-palette-line bg-white text-palette-muted transition hover:text-palette-cerulean"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
