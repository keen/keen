import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { SelectVariant } from './types';

export const Indicator = styled.div`
  padding: 8px 16px 0 0;
`;

const commonStyles = {
  noOptionsMessage: (provided: object) => ({
    ...provided,
    fontFamily: "'Lato Regular', sans-serif",
  }),
  option: (provided: object) => ({
    ...provided,
    fontSize: '16px',
    fontFamily: "'Lato Regular', sans-serif",
  }),
  singleValue: (provided: object) => ({
    ...provided,
    fontSize: '16px',
    padding: '0 8px',
    fontFamily: "'Lato Regular', sans-serif",
  }),
  placeholder: (provided: object) => ({
    ...provided,
    fontSize: '16px',
    padding: '0 8px',
    color: '#ccc',
    fontFamily: "'Lato Regular', sans-serif",
  }),
  input: (provided: object) => ({
    ...provided,
    margin: '0 8px',
    fontFamily: "'Lato Regular', sans-serif",
  }),
};

export const createStyles = (variant: SelectVariant, hasError: boolean) =>
  variant === 'outline'
    ? {
        control: (
          provided: object,
          {
            isFocused,
          }: {
            isFocused: boolean;
          }
        ) => ({
          ...provided,
          minHeight: '40px',
          borderRadius: '0px',
          border: 'none',
          boxShadow: 'none',
          borderBottom: hasError
            ? `solid 2px ${colors.red['500']}`
            : `solid 1px ${colors.blue['400']}`,
          borderColor: `${
            hasError ? colors.red['500'] : colors.blue['400']
          }!important`,
          background: isFocused
            ? transparentize(0.9, colors.blue['100'])
            : colors.white['500'],
        }),
        ...commonStyles,
      }
    : {
        control: (
          provided: object,
          {
            isFocused,
          }: {
            isFocused: boolean;
          }
        ) => ({
          ...provided,
          minHeight: '40px',
          borderRadius: '4px',
          boxShadow: 'none',
          border: hasError
            ? `solid 1px ${colors.red['100']}`
            : `solid 1px ${transparentize(0.85, colors.blue['100'])}`,
          background: isFocused
            ? transparentize(0.9, colors.blue['100'])
            : transparentize(0.95, colors.blue['100']),
        }),
        ...commonStyles,
      };
