import React from 'react';
import { Sponsor } from '../../../models/sponsor';
import { Year } from '../../../models/year';
import { imageUrl } from '../../../utils/page.utils';

type Props = Year & {
  title: string;
};

const Hero: React.FC<Props> = ({ logo, sponsors, title }) => {
  const buildSponsor = (sponsor: Sponsor) => {
    const { image, name, link, id } = sponsor;

    if (!image?.url) {
      return null;
    }

    return (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="inline-block h-full flex-shrink-0 p-4"
        key={`sponsor-${id}`}
      >
        <img
          src={imageUrl(image.url)}
          className="h-full rounded-md grayscale transition-all hover:grayscale-0"
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
          src={logo.url}
          alt={logo.alternativeText}
          className="pointer-events-none opacity-50"
        />

        <div className="absolute">
          <h1 className="p-4 text-center text-4xl font-semibold text-white">
            {title}
          </h1>
        </div>
      </div>

      <div className="sponsors-wrapper relative flex h-48 items-center">
        <div className="absolute inset-0 bg-white/5"></div>
        <div className="max-w relative flex h-full w-full justify-between overflow-auto">
          {sponsors.map(buildSponsor)}
        </div>
      </div>
    </div>
  );
};

export default Hero;
