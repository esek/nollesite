import React from 'react';
import { NavLink } from '../../../models/nav';
import { Year } from '../../../models/year';

type Props = Year & {
  title: string;
  navLinks: NavLink[];
};

const Hero: React.FC<Props> = ({ logo, title, navLinks, year }) => {
  return (
    <section className="relative flex h-[80vh] w-screen flex-col items-center justify-center">
      <h1 className="max-w-[30ch] text-center font-nolle text-5xl xl:text-7xl">
        {title}
      </h1>
    </section>
  );
};

export default Hero;
