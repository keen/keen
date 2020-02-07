import { Widgets } from './render-widget';

export type WidgetSettings = {
  title?: string;
  subtitle?: string;
};

export type Options = {
  container: HTMLElement | string;
  type: Widgets;
  widget?: WidgetSettings;
};
