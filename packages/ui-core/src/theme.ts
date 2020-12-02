/* eslint-disable @typescript-eslint/prefer-as-const */
import { colors } from '@keen.io/colors';
import { transparentize } from 'polished';
import { TextVariant, Typography } from './types';

export const textVariants: Record<TextVariant, Partial<Typography>> = {
  h1: {
    fontFamily: 'Gangster Grotesk Bold',
    fontWeight: 'normal' as 'normal',
    fontSize: 36,
    lineHeight: '40px',
  },
  h2: {
    fontFamily: 'Gangster Grotesk Bold',
    fontWeight: 'normal' as 'normal',
    fontSize: 30,
    lineHeight: '34px',
  },
  h3: {
    fontFamily: 'Gangster Grotesk Regular',
    fontWeight: 'normal' as 'normal',
    fontSize: 20,
    lineHeight: '22px',
  },
  h4: {
    fontFamily: 'Lato Regular',
    fontWeight: 'normal' as 'normal',
    fontSize: 16,
    lineHeight: '20px',
  },
  h5: {
    fontFamily: 'Lato Regular',
    fontWeight: 'normal' as 'normal',
    fontSize: 12,
    lineHeight: '14px',
  },
  h6: {
    fontFamily: 'Lato Regular',
    fontWeight: 'normal' as 'normal',
    fontSize: 10,
    lineHeight: '12px',
  },
  'body-normal': {
    fontFamily: 'Lato Regular',
    fontWeight: 'normal' as 'normal',
    fontSize: 14,
    lineHeight: '16px',
  },
  'body-bold': {
    fontFamily: 'Lato Bold',
    fontWeight: 'normal' as 'normal',
    fontSize: 14,
    lineHeight: '16px',
  },
  'number-xl': {
    fontFamily: 'Lato Light',
    fontWeight: 'normal' as 'normal',
    fontSize: 55,
    lineHeight: '64px',
  },
  'number-l': {
    fontFamily: 'Lato Light',
    fontWeight: 'normal' as 'normal',
    fontSize: 40,
    lineHeight: '50px',
  },
  'number-m': {
    fontFamily: 'Lato Light',
    fontWeight: 'normal' as 'normal',
    fontSize: 30,
    lineHeight: '36px',
  },
  'number-s': {
    fontFamily: 'Lato Regular',
    fontWeight: 'normal' as 'normal',
    fontSize: 16,
    lineHeight: '24px',
  },
};

export const theme = {
  font: {
    GangsterGroteskBold: 'Gangster Grotesk Bold',
    GangsterGroteskLight: 'Gangster Grotesk Light',
    GangsterGroteskRegular: 'Gangster Grotesk Regular',
    LatoBold: 'Lato Bold',
    LatoLight: 'Lato Light',
    LatoRegular: 'Lato Regular',
  },
};

export const solidButtonVariants = {
  prop: 'variant',
  variants: {
    primary: {
      backgroundColor: colors.yellow['400'],
      borderColor: colors.yellow['400'],
      color: colors.black['500'],
      '&:focus': {
        boxShadow: `0 0 0 0.2rem rgba(218,165,80, .5)`,
      },
      '&:hover': {
        color: colors.black['400'],
        backgroundColor: colors.yellow['500'],
      },
    },
    secondary: {
      backgroundColor: colors.blue['500'],
      borderColor: colors.blue['500'],
      color: colors.white['500'],
      boxShadow: `0 2px 4px 0 ${transparentize(0.85, colors.black['500'])}`,
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: colors.blue['400'],
      },
    },
    danger: {
      backgroundColor: colors.red['500'],
      borderColor: colors.red['500'],
      color: colors.white['500'],
      boxShadow: `0 1px 4px 0 ${transparentize(0.85, colors.black['500'])}`,
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: colors.red['300'],
      },
    },
    success: {
      backgroundColor: colors.green['300'],
      borderColor: colors.green['300'],
      color: colors.white['500'],
      boxShadow: `0 1px 4px 0 ${transparentize(0.85, colors.black['500'])}`,
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: colors.green['400'],
      },
    },
    blank: {
      backgroundColor: colors.white['500'],
      color: colors.blue['500'],
      boxShadow: `0 1px 4px 0 ${transparentize(0.85, colors.black['500'])}`,
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: transparentize(0.8, colors.blue['100']),
      },
    },
  },
};
