import { ContentPhos } from '@/models/content';
import React from 'react';
import StrapiImg from '../../strapi/strapi-image';

type Props = ContentPhos & {
  isOverphos?: boolean;
  moveUp?: boolean;
};

const Phos: React.FC<Props> = ({
  image,
  name,
  description,
  isOverphos = false,
}) => {
  return (
    <div
      className={`mx-auto flex max-w-xs flex-col space-y-2 ${
        isOverphos ? 'md:max-w-xs' : 'md:max-w-[240px]'
      }`}
    >
      <div>
        <StrapiImg {...image} />
      </div>
      <h3 className="font-nolle text-lg font-bold">{name}</h3>
      <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  );
};

export default Phos;
