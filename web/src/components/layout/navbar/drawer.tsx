import Link from 'next/link';
import React from 'react';
import styles from 'src/styles/navbar.module.scss';
import { NavLink } from '../../../models/nav';
import LanguageSelector from './language-selector';

type Props = {
  links: NavLink[];
  isOpen: boolean;
  close: () => void;
};

const Drawer: React.FC<Props> = ({ links, isOpen, close }) => {
  const doClose = () => {
    setTimeout(() => {
      close();
    }, 200);
  };

  return (
    <div>
      <div
        className={`pointer-events-none absolute top-0 left-0 h-screen w-screen transition-all delay-100 duration-500 md:hidden ${
          isOpen ? 'bg-black/60' : 'bg-transparent'
        }`}
      ></div>
      <div
        className={`${styles.drawer} ${isOpen ? styles['drawer-open'] : ''}`}
      >
        <div className="absolute top-8 left-8 md:relative md:top-auto md:left-auto">
          <LanguageSelector />
        </div>

        <div className="links-wrapper flex flex-col gap-4 md:flex-row md:gap-6">
          {links.map((link) => {
            return (
              <Link href={link.href} key={link.href}>
                <a onClick={doClose} className={`${styles.navlink}`}>
                  {link.title}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
