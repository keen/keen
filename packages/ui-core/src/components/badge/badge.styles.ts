import styled from 'styled-components';
import { variant } from 'styled-system';
import { colors } from '@keen.io/colors';

export type BadgeType = 'dark' | 'light' | 'danger' | 'success';

export const StyledBadge = styled.div<{
  type: BadgeType;
}>`
  display: inline-block;
  border-radius: 4px;
  padding: 4px 5px;

  ${variant({
    prop: 'type',
    variants: {
      dark: {
        color: colors.white['500'],
        backgroundColor: colors.black['200'],
      },
      danger: {
        color: colors.white['500'],
        backgroundColor: colors.orange['500'],
      },
      success: {
        color: colors.white['500'],
        backgroundColor: colors.green['500'],
      },
      light: {
        color: colors.black['500'],
        backgroundColor: colors.white['400'],
      },
    },
  })}
`;
