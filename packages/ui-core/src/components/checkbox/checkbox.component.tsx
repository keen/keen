import React, { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Property as CSSProperty } from 'csstype';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import {
  Container,
  IconSocket,
  StyledCheckbox,
  HiddenInput,
} from './checkbox.styles';

import { Variant } from './types';

const checkMotion = {
  initial: { opacity: 0 },
  transition: { duration: 0.2 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

type Props = {
  id: string;
  type?: Variant;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLDivElement>
  ) => void;
  display?: CSSProperty.Display;
  checked?: boolean;
  disabled?: boolean;
};

export const Checkbox: FC<Props> = ({
  id,
  type = 'primary',
  display = 'inline-block',
  onChange,
  checked = false,
  disabled = false,
}) => (
  <Container
    role="checkbox"
    display={display}
    tabIndex={0}
    onKeyPress={(e) => onChange && onChange(e)}
  >
    <HiddenInput
      id={id}
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange && onChange(e)}
    />
    <StyledCheckbox checked={checked} type={type}>
      <AnimatePresence>
        {checked && (
          <IconSocket type={type} {...checkMotion}>
            <Icon
              type="check"
              width={type === 'primary' ? 15 : 13}
              height={type === 'primary' ? 15 : 13}
              fill={colors.green['400']}
            />
          </IconSocket>
        )}
      </AnimatePresence>
    </StyledCheckbox>
  </Container>
);

export default Checkbox;
