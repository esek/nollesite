import { Content } from './content';
import { StrapiImage } from './image';

export type Year = {
  id: number;
  year: string;
  title: string;
  description: string;
  logo: StrapiImage;
  colors: YearColors;
  content: Content[];
};

export type YearColors = {
  primary: string;
  secondary: string;
  accent: string;
};
