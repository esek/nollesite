import Heading from '@/components/typography/heading';
import { useLocale } from '@/hooks/locale.hook';
import { Content } from '@/models/content';
import React from 'react';
import Sponsor from './sponsor';

const Sponsors: React.FC<Content<'content.sponsors'>> = ({ sponsors }) => {
  const { t } = useLocale();
  return (
    <>
      <Heading>{t('headers.sponsors')}</Heading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {sponsors.map((s) => (
          <Sponsor {...s} key={`sponsor-${s.id}`} />
        ))}
      </div>
    </>
  );
};

export default Sponsors;
