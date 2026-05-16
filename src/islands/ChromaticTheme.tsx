import { useEffect } from 'react';

interface Props {
  accent: string;
}

/**
 * Per-project chromatic theme. Swaps --accent + --accent-soft on mount,
 * restores defaults on unmount. Smooth 250ms transition via CSS.
 * Borrows from Pentagram's discipline color filters.
 */
export default function ChromaticTheme({ accent }: Props) {
  useEffect(() => {
    const root = document.documentElement;
    const prevAccent = root.style.getPropertyValue('--accent');
    const prevSoft = root.style.getPropertyValue('--accent-soft');

    root.style.transition = '--accent 250ms ease, --accent-soft 250ms ease, background 250ms ease';
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--accent-soft', accent + '22');

    return () => {
      if (prevAccent) root.style.setProperty('--accent', prevAccent);
      else root.style.removeProperty('--accent');
      if (prevSoft) root.style.setProperty('--accent-soft', prevSoft);
      else root.style.removeProperty('--accent-soft');
    };
  }, [accent]);

  return null;
}
