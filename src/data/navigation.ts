export interface NavItem {
  key: string;
  path: string;
}

export const mainNav: NavItem[] = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.work', path: '/work' },
  { key: 'nav.about', path: '/about' },
  { key: 'nav.contact', path: '/contact' },
];
