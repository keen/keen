/* eslint-disable react/display-name */
import React, { FC } from 'react';
import ReactSelect, { ActionMeta } from 'react-select';

import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Indicator, createStyles } from './select.styles';

export type Props = {
  options: Record<string, string>[];
  placeholder: string;
  value: any;
  onChange: (value: any, meta: ActionMeta) => void;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  hasError?: boolean;
};

export const Select: FC<Props> = ({
  options,
  placeholder,
  value,
  onChange,
  onBlur,
  hasError,
}) => (
  <ReactSelect
    components={{
      IndicatorSeparator: () => null,
      IndicatorsContainer: () => (
        <Indicator>
          <Icon type="caret-down" fill={colors.blue['200']} />
        </Indicator>
      ),
    }}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    options={options}
    styles={createStyles(hasError)}
  />
);

export default Select;
