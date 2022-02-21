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
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default App;
