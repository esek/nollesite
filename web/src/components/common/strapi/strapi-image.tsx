import { clientConfig } from '@/config.client';
import { StrapiFile } from '@/models/image';
import { toAssetUrl } from '@/utils/style.utils';
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

/**
 * Wrapper for a strapi image so we don't need to set it everytime
 */
const StrapiImg: React.FC<Props> = ({
  url,
  alternativeText,
  height,
  width,
  placeholder,
  options = { format: 'webp' },
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

    return toAssetUrl(`${src}?${params.toString()}`);
  };

  return (
    <Image
      {...rest}
      loader={imageLoader}
      placeholder={placeholder ? 'blur' : 'empty'}
      src={url}
      alt={alternativeText ?? 'Missing text'}
      height={height}
      width={width}
      blurDataURL={placeholder}
    />
  );
};

export default StrapiImg;
