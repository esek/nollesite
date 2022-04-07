import Meta from '@/components/layout/meta';
import { NavLink } from '@/models/nav';
import { Year } from '@/models/year';
import { GetServerSideProps, NextPage } from 'next';
import PageLayout from '../components/layout/page-layout';
import { getAsync } from '../lib/axios';
import { buildNavLinks, parseSubdomainToYear } from '../utils/page.utils';
import { generateColors } from '../utils/style.utils';

type Props = Year & {
  cssColors: Record<string, number>[];
  navLinks: NavLink[];
};

const Route: NextPage<Props> = ({ children, navLinks, ...props }) => {
  return (
    <>
      <Meta
        color={props.colors.primary}
        title={props.title}
        description={props.description}
        year={props.year}
        logoUrl={props.logo.url}
      />

      <PageLayout {...props} navLinks={navLinks} />
    </>
  );
};

type Params = {
  route?: string[];
};

export const getServerSideProps: GetServerSideProps<Year, Params> = async ({
  req,
  locale,
  query,
}) => {
  const year = parseSubdomainToYear(req);

  const { password = '' } = query;

  const resp = await getAsync<Year>(`/years/${year}?password=${password}`, {
    locale,
  });

  if (!resp?.year) {
    return {
      notFound: true,
    };
  }

  const colors = generateColors(resp.colors);
  const navLinks = buildNavLinks(resp.content, locale ?? 'sv');

  return {
    props: {
      ...resp,
      navLinks,
      cssColors: colors,
    },
  };
};

export default Route;