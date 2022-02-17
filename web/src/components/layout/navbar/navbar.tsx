import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { NavLink } from '../../../models/nav';
import EIcon from '../../icons/e-icon';

type Props = {
  links: NavLink[];
};

const Navbar: React.FC<Props> = ({ links }) => {
  const router = useRouter();

  const generateLink = (link: NavLink) => {
    const isActive = router.asPath === link.path;

    const className = `inline-block p-3 font-semibold ${
      isActive ? 'text-black' : 'text-gray-600'
    }`;

    return (
      <Link href={link.path} key={link.id}>
        <a className={className}>{link.title}</a>
      </Link>
    );
  };

  return (
    <header className="relative h-24 bg-primary">
      <div className="mx-auto flex h-full max-w-7xl px-4 xl:px-0 ">
        <Link href="/">
          <a className="logo-container inline-block aspect-square h-full p-3">
            <EIcon />
          </a>
        </Link>

        <div className="ml-auto self-center">{links.map(generateLink)}</div>
      </div>
    </header>
  );
};

export default Navbar;
