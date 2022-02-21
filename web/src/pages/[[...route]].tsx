import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import PageLayout from '../components/layout/page-layout';
import { getAsync } from '../lib/axios';
import { PageResponse } from '../models/strapi';
import { buildFullPath, parseSubdomainToYear } from '../utils/page.utils';

const Route: NextPage<PageResponse> = ({ children, ...props }) => {
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
> = async ({ params, req, locale }) => {
  const path = buildFullPath(params);
  const year = parseSubdomainToYear(req);

  const resp = await getAsync<PageResponse>(`/years/${year}`, { locale, path });

  if (!resp.page) {
    return {
      notFound: true,
    };
  }

  console.log(resp.year);

  return {
    props: resp,
  };
};

export default Route;
