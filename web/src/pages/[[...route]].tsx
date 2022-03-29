import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import PageLayout from '../components/layout/page-layout';
import { getAsync } from '../lib/axios';
import { PageResponse } from '../models/strapi';
import { buildFullPath, parseSubdomainToYear } from '../utils/page.utils';
import { generateColors } from '../utils/style.utils';

type Props = PageResponse & {
  cssColors: Record<string, number>[];
};

const Route: NextPage<Props> = ({ children, ...props }) => {
  return (
    <>
      <Head>
        <title>
          {props.page.title} | E-Nollning {props.year.year}
        </title>
        <meta name="description" content={props.page.description} />
      </Head>

      <PageLayout {...props} />
    </>
  );
};

type Params = {
  route?: string[];
};

export const getServerSideProps: GetServerSideProps<
  PageResponse,
  Params
> = async ({ params, req, locale, query }) => {
  const path = buildFullPath(params);
  const year = parseSubdomainToYear(req);

  const { password = '' } = query;

  const resp = await getAsync<PageResponse>(
    `/years/${year}?password=${password}`,
    { locale, path }
  );

  if (!resp.page) {
    return {
      notFound: true,
    };
  }

  const colors = generateColors(resp.year.colors);

  return {
    props: {
      ...resp,
      cssColors: colors,
    },
  };
};

export default Route;
