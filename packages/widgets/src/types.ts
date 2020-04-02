import {
  Typography,
  Position,
  Alignment,
  Layout,
  CardSettings,
} from '@keen.io/ui-core';

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

export type TextSettings = { content: string; typography: Typography };

export type WidgetSettings = {
  /** Widget title */
  title: TextSettings;
  /** Widget subtitle */
  subtitle: TextSettings;
  /** Legend component settings */
  legend?: LegendSettings;
  /** Widget card settings */
  card: CardSettings;
};
