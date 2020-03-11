import {
  Typography,
  Position,
  Alignment,
  Layout,
  CardSettings,
} from '@keen.io/ui-core';
export declare type LegendSettings = {
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
export declare type TextSettings = {
  content: string;
  typography: Typography;
};
export declare type WidgetSettings = {
  title: TextSettings;
  subtitle: TextSettings;
  legend: LegendSettings;
  card: CardSettings;
};
