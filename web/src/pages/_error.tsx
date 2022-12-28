import { NextPage, NextPageContext } from 'next';
import { ErrorProps } from 'next/error';
import Head from 'next/head';
import EIcon from '../components/icons/e-icon';

const messsages: Record<string, { title: string; btnText: string }> = {
  en: {
    title: 'Oh no! The page seems to be missing',
    btnText: 'To E-Sektionen homepage',
  },
  sv: {
    title: 'Oh nej! Sidan verkar saknas',
    btnText: 'Till E-Sektionens hemsida',
  },
};

type Props = ErrorProps & {
  btnText: string;
};

const Error: NextPage<Props> = ({ statusCode, title, btnText }) => {
  return (
    <>
      <Head>
        <title>Sidan kunde inte hittas | E-Nollning</title>
      </Head>
      <div className="flex h-screen flex-col items-center justify-center gap-4 pb-24">
        <div className="aspect-square h-52">
          <EIcon />
        </div>

        <h2 className="text-8xl font-extrabold">{statusCode}</h2>
        <h1 className="text-xl font-semibold">{title}</h1>

        <a
          href="https://esek.se"
          className="rounded-full border-2 border-sky-400 bg-sky-400 py-3 px-8 font-semibold text-white outline-none transition-all hover:-translate-y-1 focus:-translate-y-1 focus:border-black"
        >
          {btnText}
        </a>
      </div>
    </>
  );
};

Error.getInitialProps = async ({ res, err, locale }: NextPageContext) => {
  const m = messsages[locale ?? 'sv'];

  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  const title = err?.message ?? m.title;

  const btnText = m.btnText;

  return { statusCode, title, btnText };
};

export default Error;
