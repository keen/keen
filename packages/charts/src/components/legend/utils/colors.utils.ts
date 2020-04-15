import { colors } from '@keen.io/colors';

export const getIconColor = (disabled: boolean) =>
  disabled ? colors.white[300] : colors.blue[100];
