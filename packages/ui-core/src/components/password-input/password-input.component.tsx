import React, { FC, useState } from 'react';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import Input, { InputProps } from '../input';
import { Wrapper, Hint } from './password-input.styles';

export const PasswordInput: FC<InputProps> = (props) => {
  const [visible, setVisibility] = useState(false);
  const inputType = visible ? 'text' : 'password';

  return (
    <Input
      {...props}
      type={inputType}
      renderSuffix={() => (
        <Wrapper onClick={() => setVisibility(!visible)}>
          <Icon
            height={22}
            width={22}
            type={visible ? 'eye-slash-solid' : 'eye-solid'}
            fill={colors.blue['500']}
          />
          <Hint>{visible ? 'Hide' : 'Show'}</Hint>
        </Wrapper>
      )}
    />
  );
};

export default PasswordInput;
