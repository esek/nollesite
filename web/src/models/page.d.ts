export type Page = {
  id: number;
  path: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  title: string;
  description: string;
  name: string;
  section: Section[];
  nollekamp: Nollekamp;
  phos: Phos[];
};

export type Section = {};
export type Nollekamp = {};
export type Phos = {};
