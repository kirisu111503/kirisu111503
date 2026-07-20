import React, { useState } from 'react';
import { Check, Copy, Facebook, Github, Mail, MapPin, Send } from 'lucide-react';

const EMAIL = 'christian.isiderio101@gmail.com';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Software development opportunity',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
    );
    const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY;

    if (web3formsKey) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: formData.name,
            email: formData.email,
            subject: `[Portfolio Inquiry] ${formData.subject}`,
            message: formData.message,
            from_name: `${formData.name} (Portfolio Inquiry)`,
          }),
        });
        const result = await response.json();
        if (!result.success) window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      } catch {
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      }
    } else {
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    }

    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({
      name: '',
      email: '',
      subject: 'Software development opportunity',
      message: '',
    });
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="bg-white py-16 sm:py-20">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="section-kicker">Contact</p>
            <h2 className="section-title mt-3">Let us talk about the work.</h2>
            <p className="section-copy mt-4">
              I am open to junior software development roles, collaborative software projects, and
              practical systems work involving web apps, backend workflows, or document automation.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-palette-cerulean" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-palette-ink">Email</p>
                  <div className="mt-1 flex items-center gap-2">
                    <a href={`mailto:${EMAIL}`} className="break-all text-sm text-palette-muted hover:text-palette-cerulean">
                      {EMAIL}
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-palette-line bg-palette-paper text-palette-muted transition hover:text-palette-cerulean"
                      aria-label="Copy email address"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-palette-cerulean" />
                <div>
                  <p className="text-sm font-semibold text-palette-ink">Location</p>
                  <p className="mt-1 text-sm text-palette-muted">Philippines</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Github className="mt-1 h-5 w-5 text-palette-cerulean" />
                <div>
                  <p className="text-sm font-semibold text-palette-ink">GitHub</p>
                  <a
                    href="https://github.com/kirisu111503"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-sm text-palette-muted hover:text-palette-cerulean"
                  >
                    github.com/kirisu111503
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Facebook className="mt-1 h-5 w-5 text-palette-cerulean" />
                <div>
                  <p className="text-sm font-semibold text-palette-ink">Facebook</p>
                  <a
                    href="https://www.facebook.com/christ111503"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-sm text-palette-muted hover:text-palette-cerulean"
                  >
                    facebook.com/christ111503
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="panel p-6 sm:p-8">
            {submitted ? (
              <div className="py-8 text-center">
                <Check className="mx-auto h-10 w-10 text-palette-cerulean" />
                <h3 className="mt-4 text-xl font-semibold text-palette-ink">Message prepared</h3>
                <p className="section-copy mx-auto mt-2 max-w-md">
                  Thanks for reaching out. If your email app opened, you can send the prepared message there.
                </p>
                <button type="button" onClick={() => setSubmitted(false)} className="btn-secondary mt-6">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-palette-ink">Name</span>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                      className="mt-2 w-full rounded-lg border border-palette-line bg-palette-paper px-3.5 py-3 text-sm text-palette-ink transition focus:border-palette-cerulean focus:bg-white"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-palette-ink">Email</span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                      className="mt-2 w-full rounded-lg border border-palette-line bg-palette-paper px-3.5 py-3 text-sm text-palette-ink transition focus:border-palette-cerulean focus:bg-white"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-palette-ink">Subject</span>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                    className="mt-2 w-full rounded-lg border border-palette-line bg-palette-paper px-3.5 py-3 text-sm text-palette-ink transition focus:border-palette-cerulean focus:bg-white"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-palette-ink">Message</span>
                  <textarea
                    required
                    rows="6"
                    value={formData.message}
                    onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                    className="mt-2 w-full resize-none rounded-lg border border-palette-line bg-palette-paper px-3.5 py-3 text-sm text-palette-ink transition focus:border-palette-cerulean focus:bg-white"
                    placeholder="Write a short note about the role, project, or question."
                  />
                </label>

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                  {isSubmitting ? 'Preparing message...' : 'Send Message'}
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
