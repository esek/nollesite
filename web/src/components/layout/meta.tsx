import { toAssetUrl } from '@/utils/style.utils';
import Head from 'next/head';
import React from 'react';

type Props = {
  title: string;
  year: string;
  description: string;
  color: string;
  logoUrl: string;
  font?: string;
};

/** IDK What half of these are
 * Github copilot made them :)
 **/
const Meta: React.FC<Props> = ({
  title,
  year,
  description,
  color,
  logoUrl,
  font,
}) => {
  const t = `${title} | E-Nollning ${year}`;
  const logo = toAssetUrl(logoUrl);

  return (
    <Head>
      <title>{t}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={logo} />

      {font && (
        <>
          <link
            rel="preload"
            href={toAssetUrl(font)}
            as="font"
            type={`font/${font.split('.').pop()}`}
            crossOrigin="anonymous"
          />
          <style>{`
            @font-face {
              font-family: 'Nollefont';
              src: url('${toAssetUrl(font)}');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
          `}</style>
        </>
      )}

      <link rel="mask-icon" href="/safari-pinned-tab.svg" color={color} />
      <meta name="apple-mobile-web-app-title" content={t} />
      <meta name="application-name" content={t} />
      <meta name="msapplication-TileColor" content={color} />
      <meta name="theme-color" content={color} />

      <meta property="og:title" content={t} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={logo} />

      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={logo} />

      <meta name="msapplication-TileImage" content={logo} />
      <meta name="msapplication-square70x70logo" content={logo} />
      <meta name="msapplication-square150x150logo" content={logo} />
      <meta name="msapplication-wide310x150logo" content={logo} />
      <meta name="msapplication-square310x310logo" content={logo} />
    </Head>
  );
};

export default Meta;
