import Heading from '@/components/typography/heading';
import { useLocale } from '@/hooks/locale.hook';
import { Content, ContentStanding } from '@/models/content';
import React from 'react';
import Mission from './mission';
import Standing from './standing';

const Nollekamp: React.FC<Content<'content.nollekamp'>> = ({
  missions,
  showPoints,
  standings,
  description,
}) => {
  const { t } = useLocale();
  console.log(showPoints);

  const sortGroups = (g: ContentStanding[]) => {
    return g.sort((a, b) => (a.points > b.points ? -1 : 1));
  };

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

        <div className="mt-4">
          <Heading isSmall>{t('nollekamp.missions')}</Heading>
        </div>
        {showPoints && (
          <div className="mt-4 flex justify-between font-semibold">
            <h3 className="font-nolle text-xl">{t('nollekamp.title')}</h3>
            <span>{t('nollekamp.points')}</span>
          </div>
        )}

        {missions?.map((m, i) => (
          <Mission
            {...m}
            index={i + 1}
            key={`nollekamp-mission-${m.id}`}
            showPoints={showPoints}
          />
        ))}
      </div>

      {standings?.length && (
        <>
          <div className="mt-8">
            <Heading isSmall>{t('nollekamp.standings')}</Heading>
          </div>
          <div className="mt-2 flex justify-between">
            <p className="font-semibold">{t('nollekamp.group')}</p>
            <p className="font-semibold">{t('nollekamp.points')}</p>
          </div>

          <div className="mt-2 space-y-2">
            {sortGroups(standings).map((s) => (
              <Standing {...s} key={`standing--${s.id}`} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Nollekamp;
