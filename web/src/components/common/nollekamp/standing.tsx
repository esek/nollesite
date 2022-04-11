import { ContentStanding } from '@/models/content';
import React from 'react';

const Standing: React.FC<ContentStanding> = ({ group, points }) => {
  if (!group) {
    return null;
  }

  return (
    <div className="flex justify-between">
      <p>
        {group.name} ({group.number})
      </p>
      <p>{points}p</p>
    </div>
  );
};

export default Standing;
