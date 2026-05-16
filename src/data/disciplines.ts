export type Discipline = 'branding' | 'typography' | 'motion' | 'ui' | 'print' | 'identity' | 'illustration';

export const disciplineLabel: Record<Discipline, { en: string; fr: string }> = {
  branding:     { en: 'Branding',     fr: 'Identité' },
  typography:   { en: 'Typography',   fr: 'Typographie' },
  motion:       { en: 'Motion',       fr: 'Motion' },
  ui:           { en: 'UI / UX',      fr: 'UI / UX' },
  print:        { en: 'Print',        fr: 'Impression' },
  identity:     { en: 'Identity',     fr: 'Identité' },
  illustration: { en: 'Illustration', fr: 'Illustration' },
};

export const filterChips: { key: string; match: Discipline[] | 'all' }[] = [
  { key: 'work.filter.all',        match: 'all' },
  { key: 'work.filter.branding',   match: ['branding', 'identity'] },
  { key: 'work.filter.typography', match: ['typography'] },
  { key: 'work.filter.motion',     match: ['motion'] },
  { key: 'work.filter.ui',         match: ['ui'] },
  { key: 'work.filter.print',      match: ['print'] },
];
