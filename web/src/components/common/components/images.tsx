import Heading from '@/components/typography/heading';
import { slugify } from '@/utils/page.utils';
import React from 'react';
import { Content } from '../../../models/content';
import StrapiImg from '../strapi/strapi-image';

const Images: React.FC<Content<'content.images'>> = ({ images, title }) => {
  return (
    <>
      {title && <Heading id={slugify(title)}>{title}</Heading>}
      <div className="grid justify-center gap-4 md:grid-flow-col">
        {images.map(
          ({ id, image, imageText }) =>
            image.url && (
              <div key={`images-image-${id}`} className="space-y-2">
                <StrapiImg
                  {...image}
                  options={{ width: 320 }}
                  className="aspect-square max-h-80 rounded-md object-cover"
                />
                {imageText && (
                  <p className="text-sm text-secondary">{imageText}</p>
                )}
              </div>
            )
        )}
      </div>
    </>
  );
};

export default Images;
