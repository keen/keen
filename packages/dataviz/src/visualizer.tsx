import ReactDOM from 'react-dom';
import {
  parseQuery,
  createScaleSettings,
  Query,
  AnalysisResult,
} from '@keen.io/parser';
import { WidgetSettings } from '@keen.io/widgets';

import { renderWidget, Widgets } from './render-widget';

import { extendTheme } from './utils/theme.utils';
import { extendWidgetSettings } from './utils/widget.utils';
import { validateOptions } from './visualizer.utils';

import { Options, ComponentSettings } from './types';

class Visualizer {
  /** Type of widget that should be rendered */
  private type: Widgets;

  /** Container used to mount widget */
  private container: HTMLElement | string;

  /** General widget settings */
  private widgetSettings?: WidgetSettings;

  /** Specific visualization settings */
  private componentSettings?: ComponentSettings;

  constructor(options: Options) {
    validateOptions(options);
    const { container, type, widget, settings } = options;

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
    return extendWidgetSettings(this.widgetSettings);
  }

  render({ query, result }: { query: Query; result: AnalysisResult }) {
    const container =
      this.container instanceof HTMLElement
        ? this.container
        : document.querySelector(this.container);
    const { keys, results } = parseQuery({ query, result });

    ReactDOM.render(
      renderWidget({
        type: this.type,
        widgetSettings: this.setWidgetSettings(),
        componentSettings: this.setComponentSettings(),
        data: results,
        scaleSettings: createScaleSettings(query),
        query,
        keys,
      }),
      container
    );
  }
}

export default Visualizer;
