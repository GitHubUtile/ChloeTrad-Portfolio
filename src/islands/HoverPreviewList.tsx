import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence, useReducedMotion } from 'motion/react';

interface ProjectRow {
  slug: string;
  number: string;
  title: string;
  discipline: string;
  year: string;
  cover: string;
  href: string;
}

interface Props {
  rows: ProjectRow[];
  labels: { num: string; title: string; discipline: string; year: string };
}

/**
 * Editorial list view of projects. On hover, a small image preview floats
 * next to the cursor with spring physics, showing the project cover.
 * Borrows from Pentagram, Mathieu Triay, Karim Saab.
 *
 * Disabled below 1024px — taps go straight to the case study.
 */
export default function HoverPreviewList({ rows, labels }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.5 });

  function handleMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setActiveIndex(null)}
      className="relative"
    >
      <div className="hidden lg:grid grid-cols-12 gap-6 pb-4 mb-2 border-b border-[var(--rule)]">
        <span className="col-span-1 eyebrow">{labels.num}</span>
        <span className="col-span-6 eyebrow">{labels.title}</span>
        <span className="col-span-4 eyebrow">{labels.discipline}</span>
        <span className="col-span-1 eyebrow text-right">{labels.year}</span>
      </div>

      <ul>
        {rows.map((row, i) => (
          <li key={row.slug} className="group">
            <a
              href={row.href}
              onMouseEnter={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              onBlur={() => setActiveIndex(null)}
              className="grid grid-cols-12 gap-6 py-6 lg:py-7 border-b border-[var(--rule)] items-baseline transition-all duration-300 cursor-pointer hover:pl-3"
            >
              <span className="col-span-2 lg:col-span-1 font-sans text-xs text-[var(--muted)]">{row.number}</span>
              <span className="col-span-10 lg:col-span-6 font-sans font-bold text-2xl lg:text-3xl text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors duration-300">
                {row.title}
              </span>
              <span className="col-span-8 lg:col-span-4 font-sans text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
                {row.discipline}
              </span>
              <span className="col-span-4 lg:col-span-1 font-sans text-xs text-[var(--muted)] text-right">
                {row.year}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* Floating preview (desktop only, reduced-motion respected) */}
      {!reduced && (
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              key={rows[activeIndex].slug}
              className="pointer-events-none absolute z-30 hidden lg:block"
              style={{
                left: springX,
                top: springY,
                width: 360,
                height: 240,
                translateX: '-50%',
                translateY: '-120%',
              }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="w-full h-full overflow-hidden shadow-lg">
                <img
                  src={rows[activeIndex].cover}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
