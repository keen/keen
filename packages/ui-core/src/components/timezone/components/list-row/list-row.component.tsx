import React, { FC, CSSProperties } from 'react';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import TextEllipsis from '../text-ellipsis';

import { ListItem, GlobalStyle } from './list-row.styles';

import { Options } from '../../types';
import { KEYBOARD_KEYS } from '../../../../constants';

type Props = {
  data: Options;
  index: number;
  style: CSSProperties;
};

const ListRow: FC<Props> = ({ data, index, style }) => {
  const { timezones, timezone, onChange, onCancel } = data;
  const { name, utcOffset } = timezones[index];

  return (
    <>
      <GlobalStyle />
      <div
        style={style}
        role="listitem"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.keyCode === KEYBOARD_KEYS.ENTER) {
            onChange(name);
            onCancel();
          }
        }}
      >
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
    </>
  );
};

export default ListRow;
