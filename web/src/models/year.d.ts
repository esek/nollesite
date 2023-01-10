import { Content } from './content';
import { StrapiFile } from './image';

export type Year = {
  id: number;
  year: string;
  title: string;
  description: string;
  logo: StrapiFile;
  colors: YearColors;
  content: Content[];
  font?: StrapiFile;
};

export type YearColors = {
  primary: string;
  secondary: string;
  accent: string;
};
