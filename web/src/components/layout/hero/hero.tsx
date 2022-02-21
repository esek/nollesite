import React from 'react';
import { Sponsor } from '../../../models/sponsor';
import { Year } from '../../../models/year';
import { imageUrl } from '../../../utils/page.utils';

type Props = Year & {
  title: string;
};

const Hero: React.FC<Props> = ({ logo, sponsors, title }) => {
  const buildSponsor = (sponsor: Sponsor) => {
    const { image, name, link } = sponsor;

    if (!image?.url) {
      return null;
    }

    return (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="inline-block h-full flex-shrink-0 p-4"
      >
        <img
          src={imageUrl(image.url)}
          className="h-full grayscale transition-all hover:grayscale-0"
          alt={image.alternativeText}
          title={name}
        />
      </a>
    );
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-primary">
      <div className="grid flex-1 place-items-center">
        <img
          src={imageUrl(logo.url)}
          alt={logo.alternativeText}
          className="opacity-50"
        />

        <div className="absolute">
          <h1 className="text-4xl font-semibold text-white">{title}</h1>
        </div>
      </div>

      <div className="sponsors-wrapper relative flex h-48 items-center">
        <div className="absolute inset-0 bg-white/10 blur-sm"></div>
        <div className="relative mx-auto flex h-full w-full max-w-6xl justify-between overflow-auto">
          {sponsors.map(buildSponsor)}
        </div>
      </div>
    </div>
  );
};

export default Hero;
