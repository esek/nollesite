import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/main.scss';
import '../styles/strapi-text.scss';
import '../styles/tailwind.scss';
import Script from 'next/script';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Script
        async
        defer
        data-domain="nollning.esek.se"
        src="https://analytics.esek.se/js/plausible.js"
      />

      <Component {...pageProps} />
    </>
  );
};

export default App;
