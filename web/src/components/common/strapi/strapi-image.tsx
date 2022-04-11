import { StrapiImage } from '@/models/image';
import React from 'react';

type Props = StrapiImage & {
  className?: string;
  label?: string;
  height?: number;
  width?: number;
};

/**
 * Wrapper for a strapi image so we don't need to set it everytime
 */
const StrapiImg: React.FC<Props> = ({ url, alternativeText, ...rest }) => {
  return <img src={url} alt={alternativeText} {...rest} />;
};

export default StrapiImg;
