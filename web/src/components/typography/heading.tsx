import styles from '@/styles/typography.module.scss';
import React from 'react';

type Props = {
  id?: string;
  isSmall?: boolean;
  children?: React.ReactNode;
};

const Heading: React.FC<Props> = ({ children, id, isSmall }) => {
  return (
    <h2
      className={`${styles['e-heading']} ${
        isSmall ? styles['e-heading--small'] : ''
      }`}
      id={id}
    >
      {children}
    </h2>
  );
};

export default Heading;
