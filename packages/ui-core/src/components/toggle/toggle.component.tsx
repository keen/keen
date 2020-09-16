import React, { FC, useCallback } from 'react';
import { colors } from '@keen.io/colors';

import { ToggleVariant } from './types';

import {
  ToggleWrapper,
  Track,
  TrackMotion,
  LabelMotion,
  SwitcherMotion,
} from './toggle.component.styles';

type Props = {
  isOn?: boolean;
  isDisabled?: boolean;
  variant?: ToggleVariant;
  onChange?: (res: boolean) => void;
};

const Toggle: FC<Props> = ({
  isOn = false,
  isDisabled = false,
  variant = 'primary',
  onChange,
}) => {
  const onClick = useCallback(() => onChange(!isOn), [isOn]);

  const switcherVariants = {
    on: { x: 39 },
    off: { x: -1 },
  };

  const trackVariants = {
    on: { scaleX: 1 },
    off: { scaleX: 0 },
  };

  const labelColor = (variant: ToggleVariant) => {
    if (variant === 'primary') return colors.black['100'];
    if (variant === 'secondary') return colors.black['300'];
    if (variant === 'darkBlue') return colors.white['500'];
  };

  const labelVariants = {
    on: {
      justifyContent: 'flex-start',
      color: variant === 'darkBlue' ? colors.blue['500'] : colors.white['500'],
    },
    off: {
      justifyContent: 'flex-end',
      color: labelColor(variant),
    },
  };

  const switcherTransition = {
    ease: [0.69, -0.55, 0.27, 1.55],
    duration: 0.3,
  };

  const labelTransition = {
    type: 'tween',
    duration: 0.3,
  };

  return (
    <ToggleWrapper isDisabled={isDisabled} onClick={onClick}>
      <Track variant={variant}>
        <TrackMotion
          variant={variant}
          variants={trackVariants}
          initial={isOn ? 'on' : 'off'}
          animate={isOn ? 'on' : 'off'}
          transition={switcherTransition}
        />
      </Track>
      <LabelMotion
        variants={labelVariants}
        initial={isOn ? 'on' : 'off'}
        animate={isOn ? 'on' : 'off'}
        transition={labelTransition}
      >
        {isOn ? 'on' : 'off'}
      </LabelMotion>
      <SwitcherMotion
        variant={variant}
        variants={switcherVariants}
        initial={isOn ? 'on' : 'off'}
        animate={isOn ? 'on' : 'off'}
        transition={switcherTransition}
      />
    </ToggleWrapper>
  );
};

export default Toggle;
