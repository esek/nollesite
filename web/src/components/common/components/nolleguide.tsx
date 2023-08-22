import { Content } from '@/models/content';
import { toAssetUrl } from '@/utils/style.utils';
import React from 'react';
import { FiDownload, FiSave } from 'react-icons/fi';

const Nolleguide: React.FC<Content<'content.nolleguide'>> = ({
  downloadText,
  file,
}) => {
  const { url } = file;
  // -mt-12 to move it up as it is intended to be used with a "text" component describing it
  return (
    <a
      className="-mt-12 flex items-center gap-2 text-accent hover:text-accent/80"
      href={toAssetUrl(url)}
      target="_blank"
      rel="noreferrer"
      download
    >
      <span>
        <FiDownload />
      </span>
      <span>{downloadText}</span>
    </a>
  );
};

export default Nolleguide;
