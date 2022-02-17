import { NavLink } from './nav';
import { Page } from './page';
import { Year } from './year';

export type PageResponse = {
  page: Page;
  year: Year;
  navLinks: NavLink[];
};
