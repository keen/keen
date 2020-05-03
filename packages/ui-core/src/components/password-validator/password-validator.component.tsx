import React, { FC } from 'react';
import { transparentize } from 'polished';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Item, List, IconSocket } from './password-validator.styles';
import { passwordValidators } from './validators';

type Props = {
  touched: boolean;
  password: string;
};

export const PasswordValidator: FC<Props> = ({ password, touched }) => (
  <List>
    {passwordValidators.map(({ description, validate }, idx) => {
      const active = validate.test(password);
      const color = active
        ? transparentize(0.5, colors.black['300'])
        : colors.black['300'];

      return (
        <Item
          key={idx}
          color={touched && !active ? colors.orange['300'] : color}
        >
          <IconSocket>
            {active ? (
              <Icon
                type="check"
                width={12}
                height={12}
                fill={colors.green['400']}
              />
            ) : (
              <Icon
                type="line"
                width={12}
                height={3}
                fill={colors.lightBlue['500']}
              />
            )}
          </IconSocket>
          {description}
        </Item>
      );
    })}
  </List>
);

export default PasswordValidator;
