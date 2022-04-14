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
      <meta
        name="keywords"
        content="E-Sektionen, Nollning, Lunds Universitet, LTH"
      />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#101826" />
      <meta name="apple-mobile-web-app-title" content="E-Nollning" />
      <meta name="application-name" content="E-Nollning" />
      <meta name="msapplication-TileColor" content="#101826" />
      <meta name="theme-color" content="#ffffff" />

      <meta property="og:title" content={`${title} | E-Nollning ${year}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={logoUrl} />

      <meta name="twitter:title" content={title} />
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
