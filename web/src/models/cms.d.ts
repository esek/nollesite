import { Year } from './year';

export type YearsResponse = {
  data: {
    attributes: Omit<Year, 'logo' | 'colors'> & {
      primaryColor: string;
      secondaryColor: string;
      accentColor: string;
      logo: {
        data: {
          attributes: StrapiFile;
        };
      };
    };
  }[];
};
