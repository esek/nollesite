import { ContentPhadderGroup } from '@/models/content';
import React from 'react';
import StrapiImg from '../../strapi/strapi-image';

const Group: React.FC<ContentPhadderGroup> = ({
  name,
  number,
  image,
  link,
}) => {
  return (
    <a
      href={link}
      className="group flex flex-col p-4"
      target="_blank"
      rel="noreferrer"
    >
      {image && (
        <div className="relative aspect-square max-w-sm">
          <StrapiImg
            {...image}
            alt={name}
            options={{ width: 300, height: 300 }}
            layout="fill"
            className={`rounded-full transition-all ${
              link ? 'group-hover:bg-secondary/5' : ''
            }`}
          />
        </div>
      )}
      <h3 className="mt-2 text-center">
        {number}. {name}
      </h3>
    </a>
  );
};

export default Group;
