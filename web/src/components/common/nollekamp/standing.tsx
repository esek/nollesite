import { ContentStanding } from '@/models/content';
import React from 'react';

const Standing: React.FC<ContentStanding> = ({ groupName, points }) => {
  return (
    <div className="flex justify-between">
      <p>{groupName}</p>
      <p>{points}p</p>
    </div>
  );
};

export default Standing;
