import React, { FC, useState } from 'react';

import { Typography, Text } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { StyledLabel, Wrapper, Circle } from './legend-label.styles';

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
  typography,
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
      <Wrapper
        role="button"
        title={text}
        style={{ opacity: disabled ? 0.6 : 1 }}
      >
        <Circle background={disabled ? colors.gray[400] : markColor} />
        <Text {...typography}>
          {text.length > truncate ? `${text.slice(0, truncate)}...` : text}
        </Text>
      </Wrapper>
    </StyledLabel>
  );
};

export default LegendLabel;
