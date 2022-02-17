import { StrapiImage } from './image';

export type Year = {
  id: number;
  year: string;
  logo: StrapiImage;
  colors: YearColors;
};

export type YearColors = {
  primary: string;
  secondary: string;
  accent: string;
};
