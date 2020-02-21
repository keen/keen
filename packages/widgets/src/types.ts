import { Typography, Position, Alignment, Layout } from '@keen.io/ui-core';

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
};

export type WidgetSettings = {
  /** Widget title */
  title?: string;
  /** Widget subtitle */
  subtitle?: string;
  /** Legend component settings */
  legend?: LegendSettings;
};
