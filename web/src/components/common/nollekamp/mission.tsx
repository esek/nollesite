import { ContentMission } from '@/models/content';
import React from 'react';

const Mission: React.FC<ContentMission> = ({ name, points }) => {
  return (
    <div className="flex justify-between">
      <p>{name}</p>
      {points && <p>{points}</p>}
    </div>
  );
};

export default Mission;
