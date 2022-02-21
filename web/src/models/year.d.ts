import { StrapiImage } from './image';
import { Sponsor } from './sponsor';

export type Year = {
  id: number;
  year: string;
  logo: StrapiImage;
  colors: YearColors;
  sponsors: Sponsor[];
  nollekamp: Nollekamp;
  phos: Phos[];
};

export type YearColors = {
  primary: string;
  secondary: string;
  accent: string;
};

export type Nollekamp = {};
export type Phos = {};
