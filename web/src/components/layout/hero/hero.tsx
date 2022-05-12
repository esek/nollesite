import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import styles from '@/styles/hero.module.scss';

type Props = {
  title: string;
  year: string;
};

const Hero: React.FC<Props> = ({ title, year }) => {
  const scrollToFirst = () => {
    const section = document.querySelector('.strapi-component');
    if (!section?.id) {
      return;
    }

    const hashId = `#${section.id}`;

    // temporarily remove it to scroll again
    if (window.location.hash === hashId) {
      window.location.hash = '';
    }

    window.location.hash = hashId;
  };
  return (
    <section
      data-component="hero"
      className="relative flex h-[90vh] flex-col items-center justify-center pt-[45vh]"
    >
      <h1 className="max-w-[30ch] self-center px-8 text-center font-nolle text-5xl md:px-0 xl:text-7xl">
        {title}
      </h1>

      <div className={styles.herobanner}>
        <span>{year}</span>
      </div>

      <button
        className="mt-auto mb-24 animate-bounce text-3xl text-accent"
        onClick={scrollToFirst}
        aria-label="Scroll to content"
      >
        <FiChevronDown />
      </button>
    </section>
  );
};

export default Hero;
