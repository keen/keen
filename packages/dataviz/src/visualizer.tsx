import ReactDOM from 'react-dom';
import {
  parseQuery,
  createScaleSettings,
  Query,
  Step,
  AnalysisResult,
} from '@keen.io/parser';
import { WidgetSettings } from '@keen.io/widgets';

import { renderWidget, Widgets } from './render-widget';

import { extendTheme } from './utils/theme.utils';
import { extendWidgetSettings } from './utils/widget.utils';
import { validateOptions } from './visualizer.utils';

import { Options, VisualizerWidgetSettings, ComponentSettings } from './types';

class Visualizer {
  /** Type of widget that should be rendered */
  private type: Widgets;

  /** Container used to mount widget */
  private container: HTMLElement | string;

  /** General widget settings */
  private widgetSettings?: Partial<VisualizerWidgetSettings>;

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
    return extendWidgetSettings(this.widgetSettings, this.type);
  }

  render({
    query,
    steps,
    result,
  }: Partial<{
    query: Query;
    steps: Step[];
    result: AnalysisResult;
  }> = {}) {
    const container =
      this.container instanceof HTMLElement
        ? this.container
        : document.querySelector(this.container);

    let keys: string[] = [];
    let results: Record<string, any>[] = [];

    if (arguments.length) {
      const parser = parseQuery({ query, steps, result });
      keys = parser.keys;
      results = parser.results;
    }

    ReactDOM.render(
      renderWidget({
        type: this.type,
        widgetSettings: this.setWidgetSettings(),
        componentSettings: this.setComponentSettings(),
        data: results,
        scaleSettings: query ? createScaleSettings(query) : {},
        keys,
      }),
      container
    );
  }
}

export default Visualizer;
