import React from 'react';
import { PageResponse } from '../../models/strapi';
import StrapiComponents from '../common/strapi-components';
import Navbar from './navbar/navbar';

type Props = PageResponse & {
  cssColors: Record<string, number>[];
};

const PageLayout: React.FC<Props> = ({ navLinks, page, year, cssColors }) => {
  const styles = cssColors.reduce((acc, curr) => {
    return {
      ...acc,
      ...curr,
    };
  }, {}) as React.CSSProperties;

  if (!page) {
    return null;
  }

  return (
    <div
      className="relative flex min-h-screen w-screen flex-col overflow-x-hidden"
      style={styles}
    >
      <main className="flex-1 bg-primary text-secondary">
        <Navbar links={navLinks} year={year.year} logo={year.logo} />

        <StrapiComponents content={page.content} />
      </main>
    </div>
  );
};

export default PageLayout;
