import { StrapiImage } from './image';

export type Content<T extends string = string> = {
  __component: T;
  id: string;
} & (
  | TextContent
  | ImagesContent
  | PhosetContent
  | NollekampContent
  | SponsorsContent
  | CalendarContent
  | PhadderGroupsContent
);

/** TEXT */
type TextContent = {
  __component: 'content.text';
  header?: string;
  body?: string;
  showInMenu: boolean;
};

/** IMAGES */
type ImagesContent = {
  __component: 'content.images';
  title?: string;
  images: ContentImage[];
};

type ContentImage = {
  image: StrapiImage;
  imageText: string;
  id: number;
};

/** PHØSET */
type PhosetContent = {
  __component: 'content.phoset';
  phoset: ContentPhos[];
};

export type ContentPhos = {
  id: number;
  name: string;
  description: string;
  image: StrapiImage;
};

/** NOLLEKAMP */
type NollekampContent = {
  __component: 'content.nollekamp';
  missions?: ContentMission[];
  standings?: ContentStanding[];
  showPoints: boolean;
  description: string;
};

type ContentMission = {
  id: number;
  name: string;
  points?: number;
};

type ContentStanding = {
  id: number;
  points: number;
  group: ContentPhadderGroup;
};

/** SPONSORS */
type SponsorsContent = {
  __component: 'content.sponsors';
  sponsors: ContentSponsor[];
};

type ContentSponsor = {
  id: number;
  name: string;
  link: string;
  image: StrapiImage;
};

/** CALENDAR */
type CalendarContent = {
  __component: 'content.calendar';
  calendarUrl: string;
};

/** PHADDERGROUPS */
type PhadderGroupsContent = {
  __component: 'content.phaddergroups';
  groups?: ContentPhadderGroup[];
};

type ContentPhadderGroup = {
  id: number;
  name: string;
  number: number;
  link?: string;
  image?: StrapiImage;
};
