import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  formspreeUrl: string;
  labels: {
    name: string;
    email: string;
    projectType: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
  projectTypes: string[];
}

export default function ContactForm({ formspreeUrl, labels, projectTypes }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="py-16 text-center"
          >
            <div className="font-display text-3xl text-[var(--ink)] mb-3">·</div>
            <p className="text-lg text-[var(--ink)] max-w-prose mx-auto">{labels.success}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-10"
          >
            <div>
              <label htmlFor="name" className="form-label">{labels.name}</label>
              <input type="text" id="name" name="name" required autoComplete="name" className="form-input" />
            </div>
            <div>
              <label htmlFor="email" className="form-label">{labels.email}</label>
              <input type="email" id="email" name="email" required autoComplete="email" inputMode="email" className="form-input" />
            </div>
            <div>
              <label htmlFor="projectType" className="form-label">{labels.projectType}</label>
              <select id="projectType" name="projectType" required className="form-input bg-transparent cursor-pointer">
                <option value="">—</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="form-label">{labels.message}</label>
              <textarea id="message" name="message" required rows={4} className="form-input resize-none" />
            </div>
            {status === 'error' && (
              <p role="alert" className="text-sm text-[var(--accent)]">{labels.error}</p>
            )}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? labels.sending : labels.send}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
