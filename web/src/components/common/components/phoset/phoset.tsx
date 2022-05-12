import { useLocale } from '@/hooks/locale.hook';
import { Content } from '@/models/content';
import React from 'react';
import Heading from '../../../typography/heading';
import styles from '@/styles/phoset.module.scss';
import Phos from './phos';

const Phoset: React.FC<Content<'content.phoset'>> = ({ phoset }) => {
  const overphos = phoset[0];

  // remove øverphøs from the list
  const cophos = phoset.length > 1 ? phoset.slice(1) : [];

  const { t } = useLocale();

  return (
    <>
      <Heading>{t('headers.phoset')}</Heading>
      <div className={styles.phoscontainer}>
        {/* Manually place øverphøs as we want it larger */}
        <div className="md:col-span-3">
          <Phos {...overphos} isOverphos />
        </div>

        {cophos.map((p, i) => (
          <Phos {...p} key={`phos-${p.id}`} moveUp={i !== 1} />
        ))}
      </div>
    </>
  );
};

export default Phoset;
