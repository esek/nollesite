import Heading from '@/components/typography/heading';
import { slugify } from '@/utils/page.utils';
import React from 'react';
import { Content } from '../../../models/content';
import StrapiImg from '../strapi/strapi-image';

const ImageWithText: React.FC<Content<'content.image-with-text'>> = ({
  title,
  image,
  description,
  reverse = false,
}) => {
  return (
      <div
        className={`flex flex-col gap-6  ${
          reverse ? 'md:flex-row-reverse' : 'md:flex-row'
        }`}
      >
        {/* Image section */}
        <div className="flex-1 max-w-md">
          <StrapiImg
            {...image}
            className="rounded-md object-cover w-full"
            alt={title || 'Image'}
            options={{ width: 500, height: 400 }}
          />
        </div>

        {/* Text section */}
        {description && (
          <div className="flex-1 space-y-2">
                  {title && <Heading id={slugify(title)}>{title}</Heading>}
            <div
              className="text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        )}
      </div>
  );
};

export default ImageWithText;
