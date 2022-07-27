import { useLocale } from '@/hooks/locale.hook';
import { ContentStanding } from '@/models/content';
import React from 'react';
import { AiOutlineCrown } from 'react-icons/ai';
import Striped from './striped';

type Props = ContentStanding & {
  index: number;
};

const Standing: React.FC<Props> = ({ group, points, index }) => {
  const { t } = useLocale();

  if (!group) {
    return null;
  }

  return (
    <Striped idx={index}>
      <p className="relative">
        {group.name}{' '}
        <span className="text-sm italic">
          ({t('nollekamp.group')} {group.number})
        </span>
        {index === 1 && (
          <span className="absolute -top-4 -left-2 -rotate-12 text-xl text-accent">
            <AiOutlineCrown />
          </span>
        )}
      </p>

      <p>{points}p</p>
    </Striped>
  );
};

export default Standing;
