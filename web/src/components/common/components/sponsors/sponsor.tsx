import { ContentSponsor } from '@/models/content';
import React from 'react';
import StrapiImg from '../../strapi/strapi-image';

const Sponsor: React.FC<ContentSponsor> = ({ image, name, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferer"
      className="flex flex-col items-center"
    >
      <StrapiImg {...image} />
      <p>{name}</p>
    </a>
  );
};

export default Sponsor;
