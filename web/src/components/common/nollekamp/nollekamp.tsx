import Heading from '@/components/typography/heading';
import { useLocale } from '@/hooks/locale.hook';
import { Content } from '@/models/content';
import React from 'react';
import Mission from './mission';

const Nollekamp: React.FC<Content<'content.nollekamp'>> = ({
  missions,
  showPoints,
  description,
}) => {
  const { t } = useLocale();

  return (
    <>
      <Heading>Nollekamp</Heading>
      <div className="flex flex-col gap-2">
        {description && (
          <div
            className="text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        )}

        <div className="mt-4 flex justify-between font-semibold">
          <h3 className="font-nolle text-xl">{t('nollekamp.title')}</h3>
          {showPoints && <span>{t('nollekamp.points')}</span>}
        </div>

        {missions.map((m, i) => (
          <Mission
            {...m}
            index={i + 1}
            key={`nollekamp-mission-${m.id}`}
            showPoints={showPoints}
          />
        ))}
      </div>
    </>
  );
};

export default Nollekamp;
