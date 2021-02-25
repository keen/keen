import React, { FC } from 'react';

type Props = {
  id: string;
  area: string;
};

const ClipPath: FC<Props> = ({ id, area }) => {
  return (
    <clipPath id={id}>
      <path d={area} />
    </clipPath>
  );
};

export default ClipPath;
