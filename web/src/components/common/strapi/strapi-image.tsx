import { StrapiFile } from '@/models/image';
import React from 'react';

type SharpOptions = {
  format?: 'webp' | 'jpeg' | 'png' | 'gif';
  quality?: number;
  width?: number;
  height?: number;
};

type Props = StrapiFile & {
  className?: string;
  label?: string;
  options?: SharpOptions;
};

/**
 * Wrapper for a strapi image so we don't need to set it everytime
 */
const StrapiImg: React.FC<Props> = ({
  url,
  alternativeText,
  options = { format: 'webp' },
  ...rest
}) => {
  const params = new URLSearchParams();

  Object.entries(options).forEach(([key, value]) => {
    if (value) {
      params.append(key, value.toString());
    }
  });

  if (!options.format) {
    params.append('format', 'webp');
  }

  const withPx = (dimension?: number) => {
    if (!dimension) {
      return;
    }

    return `${dimension}px`;
  };

  return (
    <img
      src={`${url}?${params.toString()}`}
      alt={alternativeText}
      width={withPx(options.width)}
      height={withPx(options.height)}
      {...rest}
    />
  );
};

export default StrapiImg;
