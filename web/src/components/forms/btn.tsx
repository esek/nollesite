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
    <button
      className={`rounded-sm bg-accent px-4 py-2 text-primary transition-transform hover:scale-[1.02] active:scale-[0.95] ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Btn;
