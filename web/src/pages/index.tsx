import Meta from '@/components/layout/meta';
import { getYearData } from '@/lib/years';
import { IndexProps } from '@/models/props';
import { GetServerSideProps, NextPage } from 'next';
import PageLayout from '../components/layout/page-layout';
import { parseSubdomainToYear } from '../utils/page.utils';
import dynamic from 'next/dynamic';

const NotFound = dynamic(() => import('@/components/layout/not-found'));

const Route: NextPage<IndexProps> = (props) => {
  if (!props.found) {
    return <NotFound {...props} />;
  }

  return (
    <>
      <Meta
        color={props.colors.primary}
        title={props.title}
        description={props.description}
        year={props.year}
        logoUrl={props.logo.url}
        font={props.font?.url}
      />

      <PageLayout {...props} navLinks={props.navLinks} />
    </>
  );
};

type Params = {
  route?: string[];
};

/**
 * Runs serverside before the page is rendered
 */
export const getServerSideProps: GetServerSideProps<
  IndexProps,
  Params
> = async ({ req, locale, query, res }) => {
  // Set cache headers
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const l = locale ?? 'sv';
  const { password = '' } = query;
  const year = parseSubdomainToYear(req);

  const data = await getYearData(year, password.toString(), l);

  return {
    props: data,
  };
};

export default Route;
