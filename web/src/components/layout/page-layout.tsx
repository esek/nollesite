import { NavLink } from '@/models/nav';
import { Year } from '@/models/year';
import React from 'react';
import StrapiComponents from '../common/strapi-components';
import Navbar from './navbar/navbar';

type Props = Year & {
  cssColors: Record<string, number>[];
  navLinks: NavLink[];
};

const PageLayout: React.FC<Props> = ({
  content,
  navLinks,
  year,
  logo,
  cssColors,
}) => {
  const styles = cssColors.reduce((acc, curr) => {
    return {
      ...acc,
      ...curr,
    };
  }, {}) as React.CSSProperties;

  return (
    <div
      className="relative flex min-h-screen w-screen flex-col overflow-x-hidden"
      style={styles}
    >
      <main className="flex-1 bg-primary pt-24 text-secondary">
        <Navbar links={navLinks} year={year} logo={logo} />

        <StrapiComponents content={content} />
      </main>
    </div>
  );
};

export default PageLayout;
