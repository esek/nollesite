import Heading from '@/components/typography/heading';
import { useLocale } from '@/hooks/locale.hook';
import { Content } from '@/models/content';
import React from 'react';
import Mission from './mission';

const Nollekamp: React.FC<Content<'content.nollekamp'>> = ({ missions }) => {
  const { t } = useLocale();

  return (
    <>
      <Heading>Nollekamp</Heading>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between font-semibold">
          <span>{t('nollekamp.title')}</span>
          <span>{t('nollekamp.points')}</span>
        </div>
        {missions.map((m) => (
          <Mission {...m} key={`nollekamp-mission-${m.id}`} />
        ))}
      </div>
    </>
  );
};

export default Nollekamp;
