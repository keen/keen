import React, { FC } from 'react';
import { transparentize } from 'polished';
import { BodyText } from '@keen.io/typography';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import DropableContainer from '../../../dropable-container';
import MousePositionedTooltip from '../../../mouse-positioned-tooltip';

import {
  DisabledContainer,
  Heading,
  Title,
  Warning,
} from './timezone-error.styles';

type Props = {
  /** Label */
  label: string;
  /** Tooltip message */
  tooltipMessage: string;
  /** Placeholder text */
  placeholder: string;
  /** Tooltip portal */
  tooltipPortal?: string;
};

const TimezoneError: FC<Props> = ({
  label,
  placeholder,
  tooltipPortal,
  tooltipMessage,
}) => (
  <div>
    <Heading>
      <MousePositionedTooltip
        isActive
        tooltipPortal={tooltipPortal}
        tooltipTheme="dark"
        renderContent={() => (
          <BodyText
            variant="body3"
            color={colors.white[500]}
            fontWeight="normal"
          >
            {tooltipMessage}
          </BodyText>
        )}
      >
        <Title>
          <BodyText
            color={transparentize(0.5, colors.black[100])}
            fontWeight="bold"
            variant="body2"
          >
            {label}
          </BodyText>
          <Warning>
            <Icon
              type="warning"
              fill={colors.red[500]}
              width={15}
              height={15}
            />
          </Warning>
        </Title>
      </MousePositionedTooltip>
    </Heading>
    <DisabledContainer>
      <DropableContainer
        variant="secondary"
        isActive={false}
        value={null}
        placeholder={placeholder}
        dropIndicator
      />
    </DisabledContainer>
  </div>
);

export default TimezoneError;
