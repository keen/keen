/* eslint-disable @typescript-eslint/prefer-as-const */
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
