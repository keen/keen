import { FC } from 'react';
import {
  Position,
  Layout,
  Alignment,
  Typography,
  CardSettings,
} from '@keen.io/ui-core';
import { ContentDimension, RenderMode } from './legend.utils';
declare type Item = {
  name: string;
  color: string;
};
export declare const renderLegend: (
  elements: JSX.Element[],
  mode: RenderMode,
  initialDimension: ContentDimension,
  layout: Layout
) => JSX.Element;
declare type Props = {
  layout: Layout;
  labels: Item[];
  typography: Typography;
  card: CardSettings;
  onClick: (key: string, disabled: boolean, index: number) => void;
  position?: Position;
  alignment?: Alignment;
};
export declare const Legend: FC<Props>;
export default Legend;
