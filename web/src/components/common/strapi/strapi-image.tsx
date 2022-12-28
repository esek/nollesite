import { StrapiFile } from '@/models/image';
import getConfig from 'next/config';
import Image, { ImageLoader, ImageProps } from 'next/image';
import React from 'react';

type SharpOptions = {
  format?: 'webp' | 'jpeg' | 'png' | 'gif';
  quality?: number;
  width?: number;
  height?: number;
};

type Props = StrapiFile &
  Omit<ImageProps, 'src'> & {
    className?: string;
    label?: string;
    options?: SharpOptions;
  };

const { publicRuntimeConfig } = getConfig();
const { DEPLOY_URL } = publicRuntimeConfig;

/**
 * Wrapper for a strapi image so we don't need to set it everytime
 */
const StrapiImg: React.FC<Props> = ({
  url,
  alternativeText,
  height,
  width,
  options = { format: 'webp' },
  layout = 'intrinsic',
  ...rest
}) => {
  const imageLoader: ImageLoader = ({ src, width, quality }) => {
    const params = new URLSearchParams();
    params.append('format', options.format ?? 'webp');

    const qali = options.quality ?? quality;

    if (qali) {
      params.append('quality', qali.toString());
    }

    if (width) {
      params.append('width', Math.min(width, 1920).toString());
    }

    return `${src}?${params.toString()}`;
  };

  return (
    <Image
      {...rest}
      loader={imageLoader}
      src={`${DEPLOY_URL}${url}`}
      alt={alternativeText}
      height={height}
      width={width}
    />
  );
};

export default StrapiImg;
