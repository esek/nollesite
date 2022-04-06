import { useLocale } from '@/hooks/locale.hook';
import React, { useEffect, useRef } from 'react';

type Props = {
  id: string;
  component: string;
};

const StrapiComponent: React.FC<Props> = ({ id, children, component }) => {
  const { t } = useLocale();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.location.hash = `#${id}`;
        } else {
          window.location.hash = '';
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 1.0,
      }
    );

    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref?.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return (
    <section
      className="max-w scroll-mt-36 py-8"
      key={`strapi-content--${id}`}
      data-component={component}
      ref={ref}
      id={id}
    >
      {children}
    </section>
  );
};

export default StrapiComponent;
