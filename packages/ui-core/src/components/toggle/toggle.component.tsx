import React, { FC, useState, useEffect } from 'react';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { TrackMotion, SwitcherMotion } from './toggle.component.styles';

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

  const onTap = () => {
    setState(!state);
  };

  const trackVariants = {
    on: {
      justifyContent: 'flex-start',
      backgroundColor: colors.green['300'],
      color: colors.white['500'],
    },
    off: {
      justifyContent: 'flex-end',
      backgroundColor: transparentize(0.3, colors.gray['400']),
      color: colors.black['100'],
    },
  };

  const switcherVariants = {
    on: { x: 38 },
    off: { x: 0 },
  };

  const transition = {
    type: 'tween',
    duration: 0.2,
  };

  return (
    <TrackMotion
      isDisabled={isDisabled}
      onTap={onTap}
      variants={trackVariants}
      initial={state ? 'on' : 'off'}
      animate={state ? 'on' : 'off'}
      transition={transition}
    >
      <SwitcherMotion
        variants={switcherVariants}
        initial={state ? 'on' : 'off'}
        animate={state ? 'on' : 'off'}
        transition={transition}
      />
      {state ? 'on' : 'off'}
    </TrackMotion>
  );
};

export default Toggle;
