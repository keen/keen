import React, { FC, useState, useEffect } from 'react';
import { colors } from '@keen.io/colors';

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
  onChange?: (res: boolean) => void;
};

const Toggle: FC<Props> = ({ isOn = false, isDisabled = false, onChange }) => {
  const [state, setState] = useState(isOn);
  useEffect(() => {
    if (onChange) {
      onChange(state);
    }
  }, [state]);

  const onClick = () => {
    setState(!state);
  };

  const switcherVariants = {
    on: { x: 38 },
    off: { x: 0 },
  };

  const trackVariants = {
    on: { scaleX: 1 },
    off: { scaleX: 0 },
  };

  const labelVariants = {
    on: {
      justifyContent: 'flex-start',
      color: colors.white['500'],
    },
    off: {
      justifyContent: 'flex-end',
      color: colors.black['100'],
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
      <Track>
        <TrackMotion
          variants={trackVariants}
          initial={state ? 'on' : 'off'}
          animate={state ? 'on' : 'off'}
          transition={switcherTransition}
        />
      </Track>
      <LabelMotion
        variants={labelVariants}
        initial={state ? 'on' : 'off'}
        animate={state ? 'on' : 'off'}
        transition={labelTransition}
      >
        {state ? 'on' : 'off'}
      </LabelMotion>
      <SwitcherMotion
        variants={switcherVariants}
        initial={state ? 'on' : 'off'}
        animate={state ? 'on' : 'off'}
        transition={switcherTransition}
      />
    </ToggleWrapper>
  );
};

export default Toggle;
