import { ContentGroup } from '@/models/content';
import React from 'react';
import StrapiImg from '../../strapi/strapi-image';

const Group: React.FC<ContentGroup> = ({ name, number, logo, link }) => {
  return (
    <a
      href={link}
      className="group flex flex-col p-4"
      target="_blank"
      rel="noreferrer"
    >
      <StrapiImg
        {...logo}
        className="rounded-full p-2 transition-all group-hover:bg-secondary/5"
      />
      <h3 className="mt-2 text-center">
        {number}. {name}
      </h3>
    </a>
  );
};

export default Group;
