/* eslint-disable react/display-name */
import React, { FC } from 'react';
import ReactSelect, { ActionMeta } from 'react-select';

import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Indicator, createStyles } from './select.styles';

import { SelectVariant } from './types';

export type Props = {
  /** Collection of options */
  options: Record<string, any>[];
  /** Select element placeholder */
  placeholder: string;
  /** Select value */
  value: any;
  /** Change event handler */
  onChange: (value: any, meta: ActionMeta<any>) => void;
  /** Blur event handler */
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  /** Error indicator */
  hasError?: boolean;
  /** Select component variant */
  variant?: SelectVariant;
};

export const Select: FC<Props> = ({
  options,
  placeholder,
  value,
  onChange,
  onBlur,
  hasError,
  variant = 'outline',
}) => (
  <ReactSelect
    components={{
      IndicatorSeparator: () => null,
      IndicatorsContainer: () => (
        <Indicator>
          <Icon
            type="caret-down"
            fill={
              variant === 'outline' ? colors.blue['200'] : colors.blue['500']
            }
          />
        </Indicator>
      ),
    }}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    options={options}
    styles={createStyles(variant, hasError)}
  />
);

export default Select;
