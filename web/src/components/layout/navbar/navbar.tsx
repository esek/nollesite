import StrapiImg from '@/components/common/strapi/strapi-image';
import { StrapiImage } from '@/models/image';
import Link from 'next/link';
import React from 'react';
import { useToggle } from '../../../hooks/toggle.hook';
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
      className="sticky top-0 left-0 right-0 z-50 overflow-x-clip bg-primary/95"
      data-item="header"
    >
      <div className="header-inner max-w flex items-center justify-between py-4">
        <Link href="/">
          <a>
            <StrapiImg {...logo} height={64} width={64} label="Back to top" />
          </a>
        </Link>

        <Drawer isOpen={isOpen} links={links} close={close} />

        <div className="relative z-10 md:hidden">
          <BurgerMenuBtn isOpen={isOpen} onClick={toggle} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
