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

      if (!ref.current) {
        return;
      }

      // Clear any existing ScrollTriggers on this element
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === ref.current) {
          trigger.kill();
        }
      });

      // Calculate center position for WebKit compatibility
      const centerX = windowWidth / 2;
      const finalLeft = windowWidth < 1024 ? 32 : 0;

      // Set initial state immediately when component mounts
      gsap.set(ref.current,{
          position: 'absolute',
          scale: 4.5,
          top: '30vh',
          left: '50%',
          translateX: '-50%',
        });

      // we initialize the animation only once the component is mounted
      gsap.to(
        ref.current,
        // TO
        {
          top: 16,
          scale: 1,
          left: finalLeft,
          x: 0,
          transformOrigin: 'center center',
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

  const imgSize = 64; // the size we want the image to be in the navbar
  // Calculate required resolution for crisp rendering at max scale (4.5x)
  // At 4.5x scale, the 64px image becomes ~288px, so we need much higher resolution
  const maxScaledSize = Math.ceil(imgSize * 4.5 * 2); // 2x for retina displays
  const src = toAssetUrl(
    `${url}?format=webp&height=${maxScaledSize}&width=${maxScaledSize}`
  ); // Higher resolution to prevent pixelation when scaled

  return (
    <div className="h-16 w-16">
      <Link href="/">
        <img
          ref={ref}
          src={src}
          alt={alternativeText}
          width={imgSize}
          height={imgSize}
          style={{ 
            visibility: isMounted ? 'visible' : 'hidden',
            willChange: 'transform', // Optimize for WebKit transforms
            backfaceVisibility: 'hidden', // Prevent flickering in WebKit
            transform: 'translateZ(0)', // Force hardware acceleration
            // Image rendering optimization for scaling
            imageRendering: 'auto', // Let browser choose best method
            // Additional optimizations for smooth scaling
            objectFit: 'contain',
            objectPosition: 'center',
            // CSS custom properties for WebKit prefixes
            ...({
              '-webkit-backface-visibility': 'hidden',
              '-webkit-transform': 'translateZ(0)',
              '-webkit-font-smoothing': 'antialiased',
            } as React.CSSProperties),
          }}
        />
      </Link>
    </div>
  );
};

export default NavbarLogo;
