import { Content } from '@/models/content';
import React from 'react';
import Heading from '../typography/heading';
import Phos from './phos';

const Phoset: React.FC<Content<'content.phoset'>> = ({ phoset }) => {
  const overphos = phoset[0];
  const cophos = phoset.length > 1 ? phoset.slice(1) : [];

  return (
    <div>
      <Heading id="phos">Phøset</Heading>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-3">
          <Phos {...overphos} isOverphos />
        </div>

        {cophos.map((p, i) => (
          <Phos {...p} key={`phos-${p.id}`} moveUp={i !== 1} />
        ))}
      </div>
    </div>
  );
};

export default Phoset;
