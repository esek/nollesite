import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/main.scss';
import '../styles/strapi-text.scss';
import '../styles/tailwind.scss';

const App: NextPage<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="preload"
          href="/fonts/nollefont.woff"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/nollefont.woff2"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/nollefont.ttf"
          as="font"
          crossOrigin=""
        />
        <script
          defer
          data-domain="nollning.esek.se"
          src="https://analytics.esek.se/js/plausible.js"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default App;
