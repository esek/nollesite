import React from 'react';
import { NavLink } from '../../../models/nav';
import { Year } from '../../../models/year';

type Props = Year & {
  title: string;
  navLinks: NavLink[];
};

const Hero: React.FC<Props> = ({ logo, sponsors, title, navLinks, year }) => {
  return (
    <section className="relative flex h-screen w-screen flex-col bg-primary/20">
      <header className="fixed right-0 top-0 left-0 z-50 h-20 bg-pink-100"></header>

      {/* <HeroLogo logo={logo} /> */}

      <h1 className="absolute top-96 left-0 right-0 text-center text-3xl font-semibold md:text-4xl">
        <div className="mx-auto max-w-sm">{title}</div>
      </h1>
    </section>
  );
};

export default Hero;
