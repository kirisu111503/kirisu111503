import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const PROFILE_SRC = '/pfp.jpg';
const PROFILE_ALT = 'Christian A. Isiderio';

export default function ProfilePhoto({ buttonClassName = '', imageClassName = '' }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  const preview = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-palette-ink/90 p-4 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-label="Profile photo preview"
          onClick={() => setOpen(false)}
        >
          <div className="w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-4 text-white">
              <div>
                <p className="text-sm font-semibold">Christian A. Isiderio</p>
                <p className="text-xs text-white/70">Profile photo</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Close profile photo preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-hidden rounded-lg bg-white">
              <img src={PROFILE_SRC} alt={PROFILE_ALT} className="max-h-[78vh] w-full object-contain" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex shrink-0 overflow-hidden bg-white transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-palette-cerulean focus-visible:ring-offset-2 ${buttonClassName}`}
        aria-label="Open profile photo preview"
      >
        <img src={PROFILE_SRC} alt={PROFILE_ALT} className={imageClassName} />
      </button>

      {mounted ? createPortal(preview, document.body) : null}
    </>
  );
}
