import { StrapiFile } from '@/models/image';
import { toAssetUrl } from '@/utils/style.utils';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const NavbarLogo: React.FC<StrapiFile> = ({ url, alternativeText }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth === 0) return; // Wait for window width to be set

    const initializeGsap = async () => {
      // dynamically import gsap and scrolltrigger
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!ref.current || !ref.current.parentElement) {
        return;
      }

      // Clear any existing ScrollTriggers on this element
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === ref.current) {
          trigger.kill();
        }
      });

      const centerX = windowWidth / 2 - ref.current.parentElement.getBoundingClientRect().left;

      // Set initial state immediately when component mounts
      gsap.set(ref.current, {
        position: 'absolute',
        scale: 1,
        y: '30vh',
        x: centerX,
        z: 1,
        translate: '-50% -50%',
        WebkitFilter: '',
      });

      // we initialize the animation only once the component is mounted
      gsap.to(
        ref.current,
        // TO
        {
          scale: 1/scale,
          y: 32,
          x: 32,
          WebkitFilter: 'blur(1.1px)', // account for shitty image processing in Webkit
          scrollTrigger: {
            start: 'top top',
            end: () => window.innerHeight * 0.8, // Use function for dynamic calculation
            scrub: 1.25,
            invalidateOnRefresh: true, // Recalculate on window resize
          },
        }
      );
      
    };
    
    initializeGsap();
  }, [windowWidth]);

  // Set mounted to true immediately so logo is visible
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const resolutionFactor = 2.5; // Factor to increase resolution for better quality
  const scale =4.5;
  const imgSize = 64; // the size we want the image to be in the navbar
  const src = toAssetUrl(
    `${url}?format=webp&height=${imgSize*scale*resolutionFactor}&width=${imgSize*scale*resolutionFactor}`
  ); // Setting the resolution of the logo to its maximum size so it's only ever scaled down

  return (
    <div className="h-16 w-16">
      <Link href="/">
        <img
          ref={ref}
          src={src}
          alt={alternativeText}
          width={imgSize*scale}
          height={imgSize*scale}
          style={{ 
            visibility: isMounted ? 'visible' : 'hidden',
          }}
        />
      </Link>
    </div>
  );
};

export default NavbarLogo;
