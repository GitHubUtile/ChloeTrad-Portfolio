import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface Card {
  slug: string;
  title: string;
  discipline: string;
  cover: string;
  href: string;
  year: string;
  accent: string;
}

interface Props {
  cards: Card[];
}

/**
 * Horizontal scroll-snap reel of featured projects.
 * Desktop: mouse-drag with cursor change; touch: native swipe.
 * Borrows from Locomotive, Studio Dumbar.
 */
export default function DragScrollReel({ cards }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const reduced = useReducedMotion();

  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  function onDown(e: React.MouseEvent) {
    if (!trackRef.current) return;
    drag.current = { active: true, startX: e.clientX, startScroll: trackRef.current.scrollLeft };
    setDragging(true);
  }
  function onMove(e: React.MouseEvent) {
    if (!drag.current.active || !trackRef.current) return;
    const dx = e.clientX - drag.current.startX;
    trackRef.current.scrollLeft = drag.current.startScroll - dx;
  }
  function onUp() {
    drag.current.active = false;
    setDragging(false);
  }

  return (
    <div
      ref={trackRef}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      className="no-scrollbar overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
      style={{ cursor: dragging ? 'grabbing' : 'grab', scrollSnapType: 'x mandatory' }}
    >
      <div className="flex gap-4 lg:gap-6 pl-5 sm:pl-8 lg:pl-12 pr-5 sm:pr-8 lg:pr-12">
        {cards.map((card, i) => {
          const isImage = !card.cover.endsWith('.mp4');
          return (
            <motion.a
              key={card.slug}
              href={card.href}
              onClick={(e) => { if (dragging) e.preventDefault(); }}
              draggable={false}
              className="snap-center shrink-0 relative overflow-hidden group cursor-pointer"
              style={{
                width: 'clamp(280px, 75vw, 720px)',
                aspectRatio: '4 / 3',
              }}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
            >
              {isImage ? (
                <img
                  src={card.cover}
                  alt={card.title}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <video
                  src={card.cover}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay loop muted playsInline
                />
              )}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)' }}
              ></div>
              <div className="absolute inset-0 p-6 lg:p-10 flex flex-col justify-between text-white">
                <div className="flex items-start justify-between font-sans text-xs uppercase tracking-[0.15em]">
                  <span>{card.discipline}</span>
                  <span>{card.year}</span>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] text-balance max-w-[18ch]">
                    {card.title}
                  </h3>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
