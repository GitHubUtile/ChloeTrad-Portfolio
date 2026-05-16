import { useEffect, useState } from 'react';

interface Props {
  labels: { grid: string; list: string };
}

const STORAGE_KEY = 'work-view';

/**
 * Grid / list toggle for the work index.
 * - Defaults to list on ≥1024px, grid otherwise.
 * - Persists user choice in localStorage.
 * - Adds data-view attribute to <body> so CSS can switch layouts.
 */
export default function WorkViewToggle({ labels }: Props) {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const stored = (() => { try { return localStorage.getItem(STORAGE_KEY) as 'grid' | 'list' | null; } catch { return null; } })();
    const initial = stored ?? (window.matchMedia('(min-width: 1024px)').matches ? 'list' : 'grid');
    setView(initial);
    document.body.setAttribute('data-view', initial);
  }, []);

  function pick(next: 'grid' | 'list') {
    setView(next);
    document.body.setAttribute('data-view', next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  }

  return (
    <div
      className="hidden lg:inline-flex items-center text-xs font-mono uppercase tracking-[0.15em] border border-[var(--rule)] rounded-full overflow-hidden"
      role="group"
      aria-label="View mode"
    >
      <button
        onClick={() => pick('list')}
        className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${view === 'list' ? 'bg-[var(--ink)] text-[var(--bg)]' : 'text-[var(--muted)] hover:text-[var(--ink)]'}`}
        aria-pressed={view === 'list'}
      >
        {labels.list}
      </button>
      <button
        onClick={() => pick('grid')}
        className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${view === 'grid' ? 'bg-[var(--ink)] text-[var(--bg)]' : 'text-[var(--muted)] hover:text-[var(--ink)]'}`}
        aria-pressed={view === 'grid'}
      >
        {labels.grid}
      </button>
    </div>
  );
}
