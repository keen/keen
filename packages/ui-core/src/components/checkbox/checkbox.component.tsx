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

const checkMotion = {
  initial: { opacity: 0 },
  transition: { duration: 0.2 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

type Props = {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
};

export const Checkbox: FC<Props> = ({ id, onChange, checked = false }) => {
  return (
    <Container>
      <HiddenInput id={id} checked={checked} onChange={onChange} />
      <StyledCheckbox checked={checked}>
        <AnimatePresence>
          {checked && (
            <IconSocket {...checkMotion}>
              <Icon
                type="check"
                width={15}
                height={15}
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
