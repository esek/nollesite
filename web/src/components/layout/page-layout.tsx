import { NavLink } from '@/models/nav';
import { Year } from '@/models/year';
import React from 'react';
import StrapiComponents from '../common/strapi/strapi-components';
import Footer from './footer/footer';
import Hero from './hero/hero';
import Navbar from './navbar/navbar';

type Props = Year & {
  cssColors: Record<string, string>[];
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
      className="relative flex min-h-screen flex-col bg-primary text-secondary"
      style={styles}
    >
      <Navbar links={navLinks} year={props.year} logo={props.logo} />

      <main className="flex-1">
        <Hero {...props} />
        <StrapiComponents content={props.content} />
      </main>

      <Footer year={props.year} />

      {/* Modal portal */}
      <div id="modal-root"></div>
    </div>
  );
};

export default PageLayout;
