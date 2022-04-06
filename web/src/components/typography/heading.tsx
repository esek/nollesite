import styles from '@/styles/typography.module.scss';
import React from 'react';

type Props = {
  id?: string;
};

const Heading: React.FC<Props> = ({ children, id }) => {
  return (
    <h2 className={styles['e-heading']} id={id}>
      {children}
    </h2>
  );
};

export default Heading;
