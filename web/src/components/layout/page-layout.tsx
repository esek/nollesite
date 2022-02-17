import React from 'react';
import { PageResponse } from '../../models/strapi';
import Navbar from './navbar/navbar';

const PageLayout: React.FC<PageResponse> = ({ navLinks, page, year }) => {
  const styles = Object.entries(year.colors).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [`--color-${key}`]: value,
    }),
    {}
  ) as React.CSSProperties;

  return (
    <div className="relative flex min-h-screen flex-col" style={styles}>
      <Navbar links={navLinks} />

      <main className="flex-1">{JSON.stringify(page)}</main>
    </div>
  );
};

export default PageLayout;
