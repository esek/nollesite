import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
};

const Btn: React.FC<Props> = ({
  children,
  type = 'button',
  onClick,
  className,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.9 }}
      className={`bg-accent px-4 py-2 text-primary ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
};

export default Btn;
