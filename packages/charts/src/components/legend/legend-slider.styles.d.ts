import { Position } from '@keen.io/ui-core';
export declare type Variant = 'vertical' | 'horizontal';
export declare const VERTICAL_BUTTON_HEIGHT = 34;
export declare const dimensionMixin: (
  variant: import('../../../../ui-core/src').Layout
) => import('styled-components').FlattenSimpleInterpolation;
export declare const Button: import('styled-components').StyledComponent<
  'div',
  any,
  {
    position: Position;
    disabled: boolean;
    variant: import('../../../../ui-core/src').Layout;
  },
  never
>;
export declare const Wrapper: import('styled-components').StyledComponent<
  'div',
  any,
  {
    sliderMode: import('../../../../ui-core/src').Layout;
  },
  never
>;
export declare const Layout: import('styled-components').StyledComponent<
  'div',
  any,
  {
    sliderMode: import('../../../../ui-core/src').Layout;
  },
  never
>;
