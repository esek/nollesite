import { StrapiImage } from '@/models/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
gsap.registerPlugin(ScrollTrigger);

const NavbarLogo: React.FC<StrapiImage> = ({ url, alternativeText }) => {
  const [isMounted, setIsMounted] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    gsap.fromTo(
      ref.current,
      {
        position: 'absolute',
        scale: 4,
        top: '30vh',
        left: '50%',
        translateX: '-50%',
      },
      {
        top: '16px',
        scale: 1,
        left: window.innerWidth < 768 ? '32px' : '0px',
        translateX: '0%',
        scrollTrigger: {
          start: 'top top',
          end: '500px',
          scrub: true,
        },
      }
    );

    setIsMounted(true);
  }, [ref]);

  return (
    <div className="h-16 w-16">
      <Link href="/">
        <a>
          <img
            src={url}
            alt={alternativeText}
            height="64"
            width="64"
            ref={ref}
            style={{ visibility: isMounted ? 'visible' : 'hidden' }}
          />
        </a>
      </Link>
    </div>
  );
};

export default NavbarLogo;
