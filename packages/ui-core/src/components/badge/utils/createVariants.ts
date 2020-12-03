import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

const createVariants = (isActive: boolean) => {
  const opacity = isActive ? 0.4 : 0.7;

  return {
    prop: 'variant',
    variants: {
      black: {
        color: colors.black[500],
        backgroundColor: transparentize(opacity, colors.black[100]),
      },
      red: {
        color: colors.red[500],
        backgroundColor: transparentize(opacity, colors.red[100]),
      },
      white: {
        color: colors.white[500],
        backgroundColor: transparentize(opacity, colors.white[200]),
      },
      purple: {
        color: colors.purple[500],
        backgroundColor: transparentize(opacity, colors.purple[100]),
      },
      orange: {
        color: colors.orange[500],
        backgroundColor: transparentize(opacity, colors.orange[100]),
      },
      yellow: {
        color: colors.yellow[500],
        backgroundColor: transparentize(opacity, colors.yellow[100]),
      },
      green: {
        color: colors.green[500],
        backgroundColor: transparentize(opacity, colors.green[100]),
      },
      gray: {
        color: colors.black[100],
        backgroundColor: transparentize(opacity, colors.gray[300]),
      },
      pink: {
        color: colors.pink[500],
        backgroundColor: transparentize(opacity, colors.pink[100]),
      },
      lightBlue: {
        color: colors.lightBlue[500],
        backgroundColor: transparentize(opacity, colors.lightBlue[100]),
      },
      blue: {
        color: colors.blue[500],
        backgroundColor: transparentize(opacity, colors.blue[100]),
      },
    },
  };
};
export default createVariants;
