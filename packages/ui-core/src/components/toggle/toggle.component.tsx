import React, { FC, ReactElement, useState, useEffect } from 'react';

import {
  Label,
  Track,
  TitleWrapper,
  HiddenInput,
} from './toggle.component.styles';

type Props = {
  children: ReactElement | string;
  text?: [string, string];
  width?: number;
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange?: (res: boolean) => void;
};

export const MIN_TOGGLE_WIDTH = 60;
const BASIC_TOGGLE_TEXT = ['on', 'off'];

const Toggle: FC<Props> = ({
  children,
  text = BASIC_TOGGLE_TEXT,
  isChecked = false,
  isDisabled = false,
  width = MIN_TOGGLE_WIDTH,
  onChange,
}) => {
  const [state, setState] = useState(isChecked);

  useEffect(() => {
    if (onChange) {
      onChange(state);
    }
  }, [state]);
  return (
    <>
      <Label isDisabled={isDisabled}>
        <HiddenInput checked={state} onChange={() => setState(!state)} />
        <Track isChecked={state} width={width}>
          {state ? text[0] : text[1]}
        </Track>
        <TitleWrapper>{children}</TitleWrapper>
      </Label>
    </>
  );
};

export default Toggle;
