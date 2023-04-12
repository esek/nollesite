import { useLocale } from '@/hooks/locale.hook';
import { IndexPropsNotFound } from '@/models/props';
import { toAssetUrl } from '@/utils/style.utils';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import StrapiImg from '../common/strapi/strapi-image';

const YearNotFound: React.FC<IndexPropsNotFound> = ({
  years,
  title,
  description,
}) => {
  const { t } = useLocale();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div className="flex h-screen flex-col items-center justify-center bg-gray-50 font-sans">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">{t('not_found.title')}</h1>
          <p>{t('not_found.description')}</p>
        </div>

        <div className="max-w mt-12 flex flex-wrap items-center justify-center gap-4">
          {years.map((year) => (
            <a
              href={`https://${year.year}.nollning.esek.se`}
              key={year.year}
              className="flex flex-col items-center justify-center gap-4 rounded-md border-2 p-4"
              style={{
                backgroundColor: year.colors.primary,
                borderColor: year.colors.accent,
                color: year.colors.secondary,
              }}
            >
              <StrapiImg
                url={year.logo.url}
                alt={year.title}
                height={300}
                width={300}
                alternativeText={year.title}
              />
              <div className="flex flex-col gap-2 text-center">
                <h2 className="font-semibold">{year.title}</h2>
                <p className="text-sm">{year.year}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default YearNotFound;
