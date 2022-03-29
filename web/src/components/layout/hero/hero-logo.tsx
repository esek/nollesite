import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import React, { Ref, useEffect, useRef } from 'react';
import { StrapiImage } from '../../../models/image';
gsap.registerPlugin(ScrollTrigger);

type Props = {
  logo: StrapiImage;
};

const HeroLogo: React.FC<Props> = ({ logo }) => {
  const logoRef: Ref<HTMLDivElement> = useRef(null);
  const initialLogoTop = 128;
  const logoScale = 0.4;

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'window',
        start: 'top',
        end: '30%',
        markers: true,
        scrub: true,
      },
    });

    const y = -initialLogoTop * (1 + logoScale);

    tl.to(logoRef.current, {
      y: `${y}px`,
      x: '-40vw',
      scale: logoScale,
    });
  });

  return (
    <div className="fixed top-32 left-0 right-0 z-50">
      <div className="logo mx-auto block w-fit" ref={logoRef}>
        <Image src={logo.url} height={180} width={180} />
      </div>
    </div>
  );
};

export default HeroLogo;
