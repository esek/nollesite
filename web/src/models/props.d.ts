import { NavLink } from './nav';
import { Year } from './year';

export type IndexPropsFound = {
  found: true;
} & Year & {
    cssColors: Record<string, string>[];
    navLinks: NavLink[];
  };

export type IndexPropsNotFound = {
  found: false;
  title: string;
  description: string;
  years: Year[];
};

export type IndexProps = IndexPropsFound | IndexPropsNotFound;
