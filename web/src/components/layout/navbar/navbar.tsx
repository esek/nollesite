import { StrapiImage } from '@/models/image';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import React, { useEffect } from 'react';
import { useToggle } from '../../../hooks/toggle.hook';
import { NavLink } from '../../../models/nav';
import BurgerMenuBtn from './burger-menu-btn';
import Drawer from './drawer';
import NavbarLogo from './navbar-logo';

type Props = {
  links: NavLink[];
  year: string;
  logo: StrapiImage;
};

const Navbar: React.FC<Props> = ({ logo, links }) => {
  const { isOpen, toggle, close } = useToggle(false);

  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) {
      return;
    }

    if (isOpen) {
      disableBodyScroll(body);
    } else {
      enableBodyScroll(body);
    }
  }, [isOpen]);

  return (
    <header
      role="navigation"
      className="sticky top-0 left-0 right-0 z-50 overflow-x-clip bg-primary/95"
      data-item="header"
    >
      <div className="header-inner max-w relative flex items-center justify-between py-4">
        <NavbarLogo {...logo} />

        <Drawer isOpen={isOpen} links={links} close={close} />

        <div className="relative z-10 md:hidden">
          <BurgerMenuBtn isOpen={isOpen} onClick={toggle} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
