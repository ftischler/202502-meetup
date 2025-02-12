import { NavItem } from './sidenav';

export const loggedInNavItems = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/logout',
    label: 'Logout',
  },
] satisfies NavItem[];

export const loggedOutNavItems = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/logout',
    label: 'Logout',
  },
] satisfies NavItem[];
