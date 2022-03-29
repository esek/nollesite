import Link from 'next/link';
import { useRouter } from 'next/router';
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

  const { asPath } = useRouter();

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

        <div className="links-wrapper flex flex-col">
          {links.map((link) => (
            <Link href={link.path} key={link.id}>
              <a
                onClick={doClose}
                className={`${styles.navlink} ${
                  link.path === asPath ? styles['nav-active'] : ''
                }`}
              >
                {link.title}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
