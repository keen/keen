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
    on: { x: 38 },
    off: { x: 0 },
  };

  const trackVariants = {
    on: { scaleX: 1 },
    off: { scaleX: 0 },
  };

  const labelColor =
    variant === 'primary' ? colors.black['100'] : colors.black['300'];

  const labelVariants = {
    on: {
      justifyContent: 'flex-start',
      color: colors.white['500'],
    },
    off: {
      justifyContent: 'flex-end',
      color: labelColor,
    },
  };

  const switcherTransition = {
    ease: [0.68, -0.55, 0.27, 1.55],
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
