import Link from 'next/link';
import React from 'react';
import { SOCIALS } from '../../../constants/socials';
import { NavLink } from '../../../models/nav';
import EIcon from '../../icons/e-icon';
import LanguageSelector from './language-selector';

type Props = {
  links: NavLink[];
  year: string;
};

const Navbar: React.FC<Props> = ({ year }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20">
      <div className="max-w flex h-full py-4">
        <Link href="/">
          <a className="logo-container flex items-center gap-4">
            <div className="aspect-square h-16 rounded-md bg-white p-2 ">
              <EIcon />
            </div>

            <span className="text-lg font-semibold text-white">
              E-Nollning {year}
            </span>
          </a>
        </Link>

        <div className="ml-auto flex gap-4 self-center">
          {SOCIALS.map((link) => (
            <a
              className="hidden aspect-square h-12 place-items-center rounded-md border border-white/20 bg-transparent text-lg text-white/70 transition-colors hover:bg-white/10 md:grid"
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              <link.icon aria-label={link.name} title={link.name} />
            </a>
          ))}
        </div>

        <div className="ml-4 self-center">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
