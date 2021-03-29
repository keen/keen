import React, { FC } from 'react';

import { ListItem, Offset, Name } from './list-row.styles';

import { Options } from '../../types';

type Props = {
  data: Options;
  index: number;
  style: Record<string, any>;
};

const ListRow: FC<Props> = ({ data, index, style }) => {
  const { timezones, timezone, onChange } = data;
  const { name, utcOffset } = timezones[index];
  return (
    <div style={style} role="listitem">
      <ListItem
        isActive={timezone && name === timezone.name}
        onClick={() => {
          onChange(name);
        }}
      >
        <Name>{name}</Name>
        {utcOffset && <Offset>{utcOffset}</Offset>}
      </ListItem>
    </div>
  );
};

export default ListRow;
