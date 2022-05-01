import { useLocale } from '@/hooks/locale.hook';
import { ContentStanding } from '@/models/content';
import React from 'react';

const Standing: React.FC<ContentStanding> = ({ group, points }) => {
  const { t } = useLocale();

  if (!group) {
    return null;
  }

  return (
    <div className="flex justify-between">
      <p>
        {group.name}{' '}
        <span className="text-sm italic">
          ({t('nollekamp.group')} {group.number})
        </span>
      </p>
      <p>{points}p</p>
    </div>
  );
};

export default Standing;
