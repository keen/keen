import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorWidget, WidgetSettings, Widgets } from '@keen.io/widgets';
import { Query } from '@keen.io/parser';

import { renderWidget } from './render-widget';

import {
  extendTheme,
  extendWidgetSettings,
  prepareVisualization,
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

  constructor(options: Options) {
    validateOptions(options);
    const { container, type, mappings, widget, settings } = options;

    this.mappings = mappings || null;
    this.componentSettings = settings || {};
    this.widgetSettings = widget || {};
    this.container = container;
    this.type = type;
  }

  private getContainerNode(): Element {
    return this.container instanceof HTMLElement
      ? this.container
      : document.querySelector(this.container);
  }

  private setComponentSettings(query: Query): ComponentSettings {
    if ('theme' in this.componentSettings) {
      const { theme } = this.componentSettings;
      return {
        ...this.componentSettings,
        theme: extendTheme(theme),
      };
    }

    if (
      query &&
      query.analysis_type === 'extraction' &&
      'property_names' in query
    ) {
      const { property_names } = query;
      return {
        ...this.componentSettings,
        columnsOrder: property_names,
      };
    }

    return this.componentSettings;
  }

  private setWidgetSettings(): WidgetSettings {
    return extendWidgetSettings(this.widgetSettings, this.type);
  }

  destroy() {
    const container = this.getContainerNode();
    ReactDOM.unmountComponentAtNode(container);
  }

  error(message: string) {
    const container = this.getContainerNode();
    const settings = this.setWidgetSettings();

    ReactDOM.render(<ErrorWidget message={message} {...settings} />, container);
  }

  render(input: VisualizationInput | VisualizationInput[] = {}) {
    const container = this.getContainerNode();

    let query;
    if (!Array.isArray(input)) {
      query = input.query;
    }

    let keys: string[] = [];
    let results: Record<string, any>[] = [];
    let scaleSettings = {};

    if (arguments.length) {
      const parser = prepareVisualization(
        input,
        this.mappings,
        this.componentSettings
      );
      scaleSettings = parser.scaleSettings;
      keys = parser.keys;
      results = parser.results;
    }

    ReactDOM.render(
      renderWidget({
        type: this.type,
        widgetSettings: this.setWidgetSettings(),
        componentSettings: this.setComponentSettings(query),
        data: results,
        scaleSettings,
        keys,
      }),
      container
    );
  }
}

export default Visualizer;
