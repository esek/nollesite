import { slugify } from '@/utils/page.utils';
import React from 'react';
import { Content } from '../../models/content';
import Heading from '../typography/heading';

const Text: React.FC<Content<'content.text'>> = ({ header, body }) => {
  return (
    <div className="strapi-wysiwyg space-y-4 text-white">
      {header && <Heading id={slugify(header)}>{header}</Heading>}
      {body && (
        <div
          className="text-sm md:text-base"
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
      )}
    </div>
  );
};

export default Text;
