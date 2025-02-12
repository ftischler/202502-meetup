import { NavItem } from './sidenav';

export const loggedInNavItems = [
  {
    path: '/',
    label: 'Search',
  },
  {
    path: '/logout',
    label: 'Logout',
  },
] satisfies NavItem[];

export const loggedOutNavItems = [
  {
    path: '/login',
    label: 'Login',
  },
  {
    path: '/register',
    label: 'Register',
  },
] satisfies NavItem[];
