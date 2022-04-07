import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { NavLink } from '../../../models/nav';
import { Year } from '../../../models/year';

type Props = Year & {
  title: string;
  navLinks: NavLink[];
};

const Hero: React.FC<Props> = ({ logo, title, navLinks, year }) => {
  const scrollToFirst = () => {
    const sections = document.querySelectorAll('.strapi-component');
    window.location.hash = sections.item(0)?.id;
  };
  return (
    <section className="relative flex h-[90vh] w-screen flex-col items-center justify-center">
      <h1 className="max-w-[30ch] px-8 pb-32 text-center font-nolle text-5xl md:px-0 xl:text-7xl">
        {title}
      </h1>

      <button
        className="animate-bounce text-3xl text-accent"
        onClick={scrollToFirst}
        aria-label="Scroll to content"
      >
        <FiChevronDown />
      </button>
    </section>
  );
};

export default Hero;
