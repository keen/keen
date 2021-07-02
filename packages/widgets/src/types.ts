import {
  Typography,
  Position,
  Alignment,
  Layout,
  CardSettings,
} from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

export type Widgets =
  | 'bar'
  | 'line'
  | 'area'
  | 'pie'
  | 'donut'
  | 'gauge'
  | 'metric'
  | 'funnel'
  | 'choropleth'
  | 'bubble'
  | 'heatmap'
  | 'table';

export type LegendSettings = {
  enabled: boolean;
  position: Position;
  alignment: Alignment;
  layout: Layout;
  typography: Typography;
  card: {
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    hasShadow?: boolean;
  };
  title: {
    value?: string;
    typography?: Typography;
  };
};

export type TextSettings = { content: string; typography: Typography };

export type WidgetSettings = {
  /** Widget title */
  title?: TextSettings;
  /** Widget subtitle */
  subtitle?: TextSettings;
  /** Widget card settings */
  card?: CardSettings;
  /** Tags */
  tags?: Tag[];
  /** Legend settings*/
  legend?: LegendSettings;
  /** Geographic area*/
  geographicArea?: 'us' | 'world';
};

export type BubbleWidgetLegendSettings = {
  position: Position;
  series?: Omit<LegendSettings, 'position'>;
  bubble?: Omit<LegendSettings, 'position'>;
};

export type Tag = {
  label: string;
  variant: keyof typeof colors;
};
