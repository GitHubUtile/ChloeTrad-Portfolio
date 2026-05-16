import { useRef } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring, useReducedMotion } from 'motion/react';

interface Props {
  rowOne: string[];
  rowTwo: string[];
  rowOneFont?: string;
  rowTwoFont?: string;
}

/**
 * Two-row infinite marquee, both react to scroll velocity (skew + speed bump).
 * - Row 1 scrolls left → right at a calm baseline.
 * - Row 2 scrolls right → left, set in Arabic typography.
 * Borrows from Robin Mastromarino / Locomotive.
 */
export default function BilingualMarquee({
  rowOne,
  rowTwo,
  rowOneFont = 'font-display',
  rowTwoFont = 'font-ar-display',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });

  // skew range capped at 6deg mobile / 12deg desktop via media-query in CSS
  const skew = useTransform(smooth, [-3000, 0, 3000], [-12, 0, 12]);

  // Repeat content enough that it's always wider than the viewport
  const repeats = 3;

  if (reduced) {
    return (
      <div ref={containerRef} className="space-y-2 overflow-hidden select-none">
        <div className={`${rowOneFont} text-[clamp(2.5rem,9vw,7rem)] leading-[0.95] whitespace-nowrap`}>
          {rowOne.join('  ·  ')}
        </div>
        <div dir="rtl" className={`${rowTwoFont} text-[clamp(2rem,8vw,6rem)] leading-[0.95] whitespace-nowrap text-[var(--muted)]`}>
          {rowTwo.join('  ·  ')}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-1 overflow-hidden select-none">
      <motion.div
        style={{ skewX: skew }}
        className="flex whitespace-nowrap will-change-transform"
      >
        <motion.div
          className={`flex shrink-0 ${rowOneFont} text-[clamp(2.5rem,9vw,7rem)] leading-[0.95] text-[var(--ink)]`}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
        >
          {Array.from({ length: repeats * 2 }).map((_, i) => (
            <span key={i} className="inline-flex items-center pr-12">
              {rowOne[i % rowOne.length]}
              <span className="text-[var(--accent)] mx-8 text-[0.6em] align-middle">●</span>
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        style={{ skewX: skew }}
        className="flex whitespace-nowrap will-change-transform"
        dir="rtl"
      >
        <motion.div
          className={`flex shrink-0 ${rowTwoFont} text-[clamp(2rem,8vw,6rem)] leading-[0.95] text-[var(--muted)]`}
          animate={{ x: ['0%', '50%'] }}
          transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
        >
          {Array.from({ length: repeats * 2 }).map((_, i) => (
            <span key={i} className="inline-flex items-center pr-12" dir="rtl">
              {rowTwo[i % rowTwo.length]}
              <span className="text-[var(--accent)] mx-8 text-[0.6em] align-middle">●</span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
