import ReactDOM from 'react-dom';
import { WidgetSettings } from '@keen.io/widgets';

import { renderWidget, Widgets } from './render-widget';

import {
  extendTheme,
  extendWidgetSettings,
  prepareVisualization,
} from './utils';
import { validateOptions } from './visualizer.utils';

import {
  Options,
  VisualizerWidgetSettings,
  VisualizationInput,
  ComponentSettings,
} from './types';

class Visualizer {
  /** Type of widget that should be rendered */
  private type: Widgets;

  /** Container used to mount widget */
  private container: HTMLElement | string;

  /** Declarations for key mappings */
  private mapKeys?: Record<string, string>;

  /** General widget settings */
  private widgetSettings?: Partial<VisualizerWidgetSettings>;

  /** Specific visualization settings */
  private componentSettings?: ComponentSettings;

  constructor(options: Options) {
    validateOptions(options);
    const { container, type, mapKeys, widget, settings } = options;

    this.mapKeys = mapKeys || null;
    this.componentSettings = settings || {};
    this.widgetSettings = widget || {};
    this.container = container;
    this.type = type;
  }

  private setComponentSettings(): ComponentSettings {
    if ('theme' in this.componentSettings) {
      const { theme } = this.componentSettings;
      return {
        ...this.componentSettings,
        theme: extendTheme(theme),
      };
    }

    return this.componentSettings;
  }

  private setWidgetSettings(): WidgetSettings {
    return extendWidgetSettings(this.widgetSettings, this.type);
  }

  render(input: VisualizationInput | VisualizationInput[] = {}) {
    const container =
      this.container instanceof HTMLElement
        ? this.container
        : document.querySelector(this.container);

    let keys: string[] = [];
    let results: Record<string, any>[] = [];
    let scaleSettings = {};

    if (arguments.length) {
      const parser = prepareVisualization(input, this.mapKeys);
      scaleSettings = parser.scaleSettings;
      keys = parser.keys;
      results = parser.results;
    }

    ReactDOM.render(
      renderWidget({
        type: this.type,
        widgetSettings: this.setWidgetSettings(),
        componentSettings: this.setComponentSettings(),
        data: results,
        scaleSettings,
        keys,
      }),
      container
    );
  }
}

export default Visualizer;
