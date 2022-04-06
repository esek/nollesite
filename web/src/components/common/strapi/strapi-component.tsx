import React from 'react';

export type StrapiComponentProps = {
  id: string;
  component: string;
};

const StrapiComponent: React.FC<StrapiComponentProps> = ({
  id,
  children,
  component,
}) => {
  return (
    <section
      className="max-w scroll-mt-20 py-8"
      data-component={component}
      id={id}
    >
      {children}
    </section>
  );
};

export default StrapiComponent;
