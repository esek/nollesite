import { ContentMission } from '@/models/content';
import React from 'react';
import Striped from './striped';

type Props = ContentMission & {
  index: number;
  showPoints: boolean;
};

const Mission: React.FC<Props> = ({ name, points, index, showPoints }) => {
  return (
    <Striped idx={index}>
      <p>
        {index}. {name}
      </p>

      {showPoints && <p>{points}</p>}
    </Striped>
  );
};

export default Mission;
