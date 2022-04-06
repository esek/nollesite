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
  return (
    <Head>
      <title>
        {title} | E-Nollning {year}
      </title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="E-Sektionen, Nollning, Lunds Universitet, LTH"
      />

      <meta property="og:title" content={`${title} | E-Nollning ${year}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={logoUrl} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={logoUrl} />

      <meta name="theme-color" content={color} />
      <meta name="msapplication-TileColor" content={color} />
      <meta name="apple-mobile-web-app-status-bar-style" content={color} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="E-Nollning" />
      <meta name="application-name" content="E-Nollning" />

      <meta name="msapplication-TileImage" content={logoUrl} />
      <meta name="msapplication-square70x70logo" content={logoUrl} />
      <meta name="msapplication-square150x150logo" content={logoUrl} />
      <meta name="msapplication-wide310x150logo" content={logoUrl} />
      <meta name="msapplication-square310x310logo" content={logoUrl} />
    </Head>
  );
};

export default Meta;
