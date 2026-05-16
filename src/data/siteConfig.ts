import type { Lang } from '../i18n/languages';

export const siteConfig = {
  name: 'Chloe Trad',
  domain: 'chloetrad.com',
  tagline: {
    en: 'Graphic designer · Beirut',
    fr: 'Designer graphique · Beyrouth',
  } as Record<Lang, string>,
  email: 'chloetrad1@gmail.com',
  phone: '+961 79 156 936',
  location: {
    en: 'Beirut, Lebanon',
    fr: 'Beyrouth, Liban',
  } as Record<Lang, string>,
  social: {
    instagram: 'https://www.instagram.com/chloetrad',
    linkedin: 'https://www.linkedin.com/in/chloe-trad-482891273/',
    behance: 'https://www.behance.net/chloetrad',
  },
  formspree: {
    contact: 'https://formspree.io/f/YOUR_FORM_ID',
  },
};
