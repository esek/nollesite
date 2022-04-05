import { NavLink } from '@/models/nav';
import { Year } from '@/models/year';
import React from 'react';
import StrapiComponents from '../common/strapi-components';
import Hero from './hero/hero';
import Navbar from './navbar/navbar';

type Props = Year & {
  cssColors: Record<string, number>[];
  navLinks: NavLink[];
};

const PageLayout: React.FC<Props> = ({ cssColors, navLinks, ...props }) => {
  const styles = cssColors.reduce((acc, curr) => {
    return {
      ...acc,
      ...curr,
    };
  }, {}) as React.CSSProperties;

  return (
    <div
      className="relative flex min-h-screen w-screen flex-col"
      style={styles}
    >
      <main className="flex-1 bg-primary text-secondary">
        <Navbar links={navLinks} year={props.year} logo={props.logo} />

        <Hero {...props} navLinks={navLinks} />
        <StrapiComponents content={props.content} />
      </main>
    </div>
  );
};

export default PageLayout;
