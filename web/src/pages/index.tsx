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
  children?: React.ReactNode;
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

/**
 * Runs serverside before the page is rendered
 */
export const getServerSideProps: GetServerSideProps<Year, Params> = async ({
  req,
  locale,
  query,
}) => {
  // tries to get the year from the subdomain ex. 1234.nollning.esek.se
  const year = parseSubdomainToYear(req);

  const { password = '' } = query;

  // fetches the year data from strapi
  const resp = await getAsync<Year>(`/years/${year}?password=${password}`, {
    locale,
  });

  if (!resp?.year) {
    return {
      props: {},
      notFound: true,
    };
  }

  // get the css colors
  const colors = generateColors(resp.colors);

  // build the nav links
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
