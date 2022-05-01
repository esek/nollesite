import { ContentMission } from '@/models/content';
import React from 'react';

type Props = ContentMission & {
  index: number;
  showPoints: boolean;
};

const Mission: React.FC<Props> = ({ name, points, index, showPoints }) => {
  return (
    <div className="flex justify-between">
      <p>
        {index}. {name}
      </p>

      {showPoints && <p>{points}</p>}
    </div>
  );
};

export default Mission;
