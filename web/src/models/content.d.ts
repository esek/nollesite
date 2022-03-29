import { StrapiImage } from './image';

export type Content<T extends string = string> = {
  __component: T;
  id: string;
} & (TextContent | ImagesContent);

type TextContent = {
  __component: 'content.text';
  header?: string;
  body?: string;
};

type ImagesContent = {
  __component: 'content.images';
  images: ContentImage[];
};

type ContentImage = {
  image: StrapiImage;
  imageText: string;
  id: string;
};
