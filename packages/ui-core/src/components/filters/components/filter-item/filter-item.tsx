import React, { FC, useEffect, useRef, useState } from 'react';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import { Checkbox, MousePositionedTooltip } from '../../../index';
import { Container, Label } from './filter-item.styles';

type Props = {
  /** Filter label */
  label: string;
  /** Filter identifier */
  id: string;
  /** Active state indicator */
  isActive?: boolean;
  /** Change event handler */
  onChange: (isActive: boolean) => void;
};

const FilterItem: FC<Props> = ({ label, id, onChange, isActive }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [labelTruncated, setLabelTruncated] = useState(false);

  useEffect(() => {
    if (containerRef.current.offsetWidth < containerRef.current.scrollWidth) {
      setLabelTruncated(true);
    }
  }, []);

  return (
    <MousePositionedTooltip
      isActive={labelTruncated}
      renderContent={() => (
        <BodyText variant="body2" fontWeight="normal" color={colors.black[500]}>
          {label}
        </BodyText>
      )}
      tooltipTheme="light"
    >
      <Container htmlFor={id}>
        <Checkbox
          id={id}
          type="secondary"
          checked={isActive}
          onChange={() => onChange(!isActive)}
        />
        <Label>
          <BodyText variant="body2" enableTextEllipsis ref={containerRef}>
            {label}
          </BodyText>
        </Label>
      </Container>
    </MousePositionedTooltip>
  );
};

export default FilterItem;
