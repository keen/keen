import React, { FC, useState } from 'react';

import { Typography } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { StyledLabel, Text, Circle } from './legend-label.styles';

type Props = {
  text: string;
  typography: Typography;
  markColor: string;
  onClick: (disabled: boolean) => void;
  truncate?: number;
};

const LegendLabel: FC<Props> = ({
  text,
  markColor,
  onClick,
  truncate = 20,
}) => {
  const [disabled, setDisable] = useState(false);

  return (
    <StyledLabel
      onClick={() => {
        onClick(!disabled);
        setDisable(!disabled);
      }}
    >
      <Text role="button" title={text} style={{ opacity: disabled ? 0.6 : 1 }}>
        <Circle background={disabled ? colors.gray[400] : markColor} />
        {text.length > truncate ? `${text.slice(0, truncate)}...` : text}
      </Text>
    </StyledLabel>
  );
};

export default LegendLabel;
