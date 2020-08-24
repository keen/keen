import React, { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
};

export const Checkbox: FC<Props> = ({
  id,
  type = 'primary',
  onChange,
  checked = false,
  disabled = false,
}) => {
  return (
    <Container>
      <HiddenInput
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={e => onChange && onChange(e)}
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
};

export default Checkbox;
