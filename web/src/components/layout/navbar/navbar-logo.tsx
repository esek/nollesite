import StrapiImg from '@/components/common/strapi/strapi-image';
import { StrapiFile } from '@/models/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
gsap.registerPlugin(ScrollTrigger);

const NavbarLogo: React.FC<StrapiFile> = ({ url, alternativeText }) => {
  const [isMounted, setIsMounted] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    // we initialize the animation only once the component is mounted
    gsap.fromTo(
      ref.current,
      // FROM
      {
        position: 'absolute',
        scale: 4.5,
        top: '30vh',
        left: '50%',
        translateX: '-50%',
      },
      // TO
      {
        top: '16px',
        scale: 1,
        left: window.innerWidth < 1024 ? '32px' : '0px',
        translateX: '0%',
        scrollTrigger: {
          start: 'top top',
          end: `${window.innerHeight * 0.8}px`, // 80% of screen height
          scrub: 1.25,
        },
      }
    );

    setIsMounted(true);
  }, [ref]);

  const imgSize = 64; // the size we want the image to be in the navbar
  const src = `${url}?format=webp&height=${imgSize * 5}&width=${imgSize * 5}`; // 5x the size of the logo so that it's still clear when scaled

  return (
    <div className="h-16 w-16">
      <Link href="/">
        <a>
          <img
            ref={ref}
            src={src}
            alt={alternativeText}
            width={`${imgSize}px`}
            height={`${imgSize}px`}
            style={{ visibility: isMounted ? 'visible' : 'hidden' }}
          />
        </a>
      </Link>
    </div>
  );
};

export default NavbarLogo;
