import Head from 'next/head';
import React from 'react';

type Props = {
  title: string;
  year: string;
  description: string;
  color: string;
  logoUrl: string;
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
}) => {
  const t = `${title} | E-Nollning ${year}`;

  return (
    <Head>
      <title>{t}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={logoUrl} />

      <link rel="mask-icon" href="/safari-pinned-tab.svg" color={color} />
      <meta name="apple-mobile-web-app-title" content={t} />
      <meta name="application-name" content={t} />
      <meta name="msapplication-TileColor" content={color} />
      <meta name="theme-color" content={color} />

      <meta property="og:title" content={t} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={logoUrl} />

      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={logoUrl} />

      <meta name="msapplication-TileImage" content={logoUrl} />
      <meta name="msapplication-square70x70logo" content={logoUrl} />
      <meta name="msapplication-square150x150logo" content={logoUrl} />
      <meta name="msapplication-wide310x150logo" content={logoUrl} />
      <meta name="msapplication-square310x310logo" content={logoUrl} />
    </Head>
  );
};

export default Meta;
