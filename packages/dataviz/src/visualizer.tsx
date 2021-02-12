import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorWidget, WidgetSettings, Widgets } from '@keen.io/widgets';

import { renderWidget } from './render-widget';
import text from './text.json';

import {
  extendTheme,
  extendChartSettings,
  extendWidgetSettings,
  prepareVisualization,
  createSettingsFromQuery,
  validateOptions,
} from './utils';

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

  /** Declarations for labels and keys mappings */
  private mappings: Record<string, string>;

  /** General widget settings */
  private widgetSettings: Partial<VisualizerWidgetSettings>;

  /** Specific visualization settings */
  private componentSettings: ComponentSettings;

  /** Visualization data provided from Keen API */
  private useKeenAsDataSource = true;

  constructor(options: Options) {
    validateOptions(options);
    const { container, type, mappings, widget, settings } = options;

    this.mappings = mappings || null;
    this.componentSettings = settings || {};
    this.widgetSettings = widget || {};
    this.container = container;
    this.type = type;

    if ('data' in this.componentSettings) {
      this.useKeenAsDataSource = false;
    }
  }

  private getContainerNode(): Element {
    return this.container instanceof HTMLElement
      ? this.container
      : document.querySelector(this.container);
  }

  private setComponentSettings(
    input: VisualizationInput | VisualizationInput[] = {},
    widgetType: Widgets,
    keys: string[]
  ) {
    let componentSettings = { ...this.componentSettings };

    if ('theme' in this.componentSettings) {
      const { theme } = this.componentSettings;
      componentSettings = { ...componentSettings, theme: extendTheme(theme) };
    }

    if (!Array.isArray(input) && (input.query || input.steps)) {
      let query = {};
      if (input.query) query = input.query;

      componentSettings = extendChartSettings(
        createSettingsFromQuery({ query, widgetType, keys }),
        componentSettings
      );
    } else if (Array.isArray(input) && input[0]?.query) {
      const [firstQuery] = input;
      const { query } = firstQuery;
      componentSettings = extendChartSettings(
        createSettingsFromQuery({ query, widgetType, keys }),
        componentSettings
      );
    }

    return componentSettings;
  }

  private setWidgetSettings(): WidgetSettings {
    return extendWidgetSettings(this.widgetSettings, this.type);
  }

  destroy() {
    const container = this.getContainerNode();
    ReactDOM.unmountComponentAtNode(container);
  }

  error(message: string, title?: string) {
    const container = this.getContainerNode();
    const settings = this.setWidgetSettings();

    ReactDOM.render(
      <ErrorWidget message={message} header={title} {...settings} />,
      container
    );
  }

  render(input: VisualizationInput | VisualizationInput[] = {}) {
    const container = this.getContainerNode();
    let keys: string[] = [];
    let results: Record<string, any>[] = [];

    const parseQuery = arguments.length && this.useKeenAsDataSource;
    if (parseQuery) {
      const parser = prepareVisualization(
        input,
        this.mappings,
        this.componentSettings,
        this.type
      );
      keys = parser.keys;
      results = parser.results;
    }

    const isEmptyAnalysisResult =
      this.useKeenAsDataSource && results.length === 0;
    if (isEmptyAnalysisResult) {
      return this.error(text.empty_analysis_result);
    }

    ReactDOM.render(
      renderWidget({
        type: this.type,
        widgetSettings: this.setWidgetSettings(),
        componentSettings: this.setComponentSettings(input, this.type, keys),
        data: results,
        keys,
      }),
      container
    );
  }
}

export default Visualizer;
