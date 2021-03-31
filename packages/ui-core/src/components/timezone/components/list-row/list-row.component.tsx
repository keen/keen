import React, { FC } from 'react';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import TextEllipsis from '../text-ellipsis';

import { ListItem } from './list-row.styles';

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
        <TextEllipsis>
          <BodyText variant="body3" fontWeight={400} color={colors.blue[500]}>
            {name}
          </BodyText>
        </TextEllipsis>
        {utcOffset && (
          <BodyText variant="body3" fontWeight={400} color={colors.blue[200]}>
            {utcOffset}
          </BodyText>
        )}
      </ListItem>
    </div>
  );
};

export default ListRow;
