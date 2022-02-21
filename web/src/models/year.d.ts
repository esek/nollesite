import { StrapiImage } from './image';
import { Sponsor } from './sponsor';

export type Year = {
  id: number;
  year: string;
  logo: StrapiImage;
  colors: YearColors;
  sponsors: Sponsor[];
};

export type YearColors = {
  primary: string;
  secondary: string;
  accent: string;
};
