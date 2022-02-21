import React from 'react';
import { PageResponse } from '../../models/strapi';
import Hero from './hero/hero';
import Navbar from './navbar/navbar';

const PageLayout: React.FC<PageResponse> = ({ navLinks, page, year }) => {
  const styles = Object.entries(year.colors).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [`--color-${key}`]: value,
    }),
    {}
  ) as React.CSSProperties;

  if (!page) {
    return null;
  }

  return (
    <div
      className="relative flex min-h-screen w-screen flex-col"
      style={styles}
    >
      <Navbar links={navLinks} year={year.year} />

      <main className="flex-1">
        <Hero {...year} title={page.title} />
      </main>
    </div>
  );
};

export default PageLayout;
