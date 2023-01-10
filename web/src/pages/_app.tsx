import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/main.scss';
import '../styles/strapi-text.scss';
import '../styles/tailwind.scss';

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
