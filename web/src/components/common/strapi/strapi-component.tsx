import React from 'react';

export type StrapiComponentProps = {
  id: string;
  component: string;
};
/**
 * Wrapper element for a component in strapi
 * sets id's, classes and a data-attribute for easier debugging
 */
const StrapiComponent: React.FC<StrapiComponentProps> = ({
  id,
  children,
  component,
}) => {
  return (
    <section
      className="strapi-component max-w scroll-mt-20 py-8"
      data-component={component}
      id={id}
    >
      {children}
    </section>
  );
};

export default StrapiComponent;
