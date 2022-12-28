import { useLocale } from '@/hooks/locale.hook';
import { IndexPropsNotFound } from '@/models/props';
import getConfig from 'next/config';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Heading from '../typography/heading';
import Meta from './meta';

const { publicRuntimeConfig } = getConfig();
const { DEPLOY_URL } = publicRuntimeConfig;

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
              className="flex flex-col items-center justify-center gap-4 rounded-md border-2 p-4 font-semibold"
              style={{
                backgroundColor: year.colors.primary,
                borderColor: year.colors.accent,
                color: year.colors.secondary,
              }}
            >
              <Image
                src={`${DEPLOY_URL}${year.logo.url}?w=300&h=300&format=webp`}
                alt={year.title}
                width={150}
                height={150}
              />
              <h2>{year.title}</h2>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default YearNotFound;
