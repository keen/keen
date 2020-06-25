import ReactDOM from 'react-dom';
import { WidgetSettings } from '@keen.io/widgets';
import { colors } from '@keen.io/colors';

import { renderWidget, Widgets } from './render-widget';

import {
  extendTheme,
  extendWidgetSettings,
  prepareVisualization,
  validateOptions,
  exportToSvg,
} from './utils';

import {
  Options,
  ImageExportOptions,
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

  exportImage(
    exportOptions: ImageExportOptions = {
      quality: 1,
      backgroundColor: colors.white[500],
    }
  ) {
    try {
      exportToSvg({
        ...exportOptions,
        node: this.getContainerNode(),
      });
    } catch (err) {
      console.error(err);
    }
  }

  destroy() {
    const container = this.getContainerNode();
    ReactDOM.unmountComponentAtNode(container);
  }

  render(input: VisualizationInput | VisualizationInput[] = {}) {
    const container = this.getContainerNode();

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
