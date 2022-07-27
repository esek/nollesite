import React from 'react';

type Props = {
  idx: number;
  children: React.ReactNode;
};

const Striped: React.FC<Props> = ({ idx, children }) => {
  const isEven = idx % 2 === 0;
  return (
    <div
      className={`flex justify-between p-4 ${isEven ? 'bg-secondary/10' : ''}`}
    >
      {children}
    </div>
  );
};

export default Striped;
