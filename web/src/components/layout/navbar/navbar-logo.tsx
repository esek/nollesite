import { StrapiFile } from '@/models/image';
import { toAssetUrl } from '@/utils/style.utils';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const NavbarLogo: React.FC<StrapiFile> = ({ url, alternativeText }) => {
  const [isMounted, setIsMounted] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const initializeGsap = async () => {
      // dynamically import gsap and scrolltrigger
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

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
    };

    initializeGsap();
  }, [ref]);

  const imgSize = 64; // the size we want the image to be in the navbar
  const src = toAssetUrl(
    `${url}?format=webp&height=${imgSize * 5}&width=${imgSize * 5}`
  ); // 5x the size of the logo so that it's still clear when scaled

  return (
    <div className="h-16 w-16">
      <Link href="/">
        <img
          ref={ref}
          src={src}
          alt={alternativeText}
          width={`${imgSize}px`}
          height={`${imgSize}px`}
          style={{ visibility: isMounted ? 'visible' : 'hidden' }}
        />
      </Link>
    </div>
  );
};

export default NavbarLogo;
