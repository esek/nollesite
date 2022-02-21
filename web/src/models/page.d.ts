import { Content } from './content';

export type Page = {
  id: number;
  path: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  title: string;
  description: string;
  name: string;
  content: Content[];
};
