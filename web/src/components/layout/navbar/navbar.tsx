import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useToggle } from '../../../hooks/toggle.hook';
import { StrapiImage } from '../../../models/image';
import { NavLink } from '../../../models/nav';
import BurgerMenuBtn from './burger-menu-btn';
import Drawer from './drawer';

type Props = {
  links: NavLink[];
  year: string;
  logo: StrapiImage;
};

const Navbar: React.FC<Props> = ({ year, logo, links }) => {
  const { isOpen, toggle, close } = useToggle(false);

  return (
    <header
      role="navigation"
      className="max-w sticky top-0 z-50 mx-auto flex items-center justify-between py-4"
      data-item="header"
    >
      <Link href="/">
        <a>
          <Image
            src={logo.url}
            alt={logo.alternativeText}
            height="64"
            width="64"
            aria-label="Back to home"
          />
        </a>
      </Link>

      <Drawer isOpen={isOpen} links={links} close={close} />

      <div className="relative z-10 md:hidden">
        <BurgerMenuBtn isOpen={isOpen} onClick={toggle} />
      </div>
    </header>
  );
};

export default Navbar;
