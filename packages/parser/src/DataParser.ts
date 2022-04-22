import { Widgets } from '@keen.io/widgets';
import { Query, Step, extractGroupBySettings } from '@keen.io/query';

import { setTransformationType } from './utils';

import { TRANSFORMATIONS } from './transformations';
import { PREFIX } from './constants';

import {
  IDataParser,
  DateModifier,
  Transformation,
  ParserOutput,
  ParserInput,
  ParserSettings,
} from './types';

class DataParser implements IDataParser {
  constructor(
    private transformation: Transformation = null,
    private visualization: Widgets = null,
    private readonly timeBucketsModifier: DateModifier = null,
    private readonly fillEmptyIntervalsKeys: boolean = false,
    private readonly mergePropertiesOrder: string[] | null = null
  ) {}

  private get parserSettings() {
    return {
      fillEmptyIntervalsKeys: this.fillEmptyIntervalsKeys,
      mergePropertiesOrder: this.mergePropertiesOrder,
      dateModifier: this.timeBucketsModifier,
    };
  }

  static createSettingsFromQuery(analysis: { query?: Query; steps?: Step[] }) {
    const { query, steps } = analysis;

    let parserSettings: Omit<ParserSettings, 'dateModifier'> & {
      transformation: Transformation;
    } = {
      mergePropertiesOrder: null,
      fillEmptyIntervalsKeys: false,
      transformation: setTransformationType(query, steps),
    };

    if (query) {
      const { group_by: groupBy, interval, order_by: orderBy, limit } = query;
      if (groupBy) {
        parserSettings = {
          ...parserSettings,
          mergePropertiesOrder: extractGroupBySettings(groupBy),
        };
      }

      if (interval && groupBy && orderBy && limit) {
        parserSettings = {
          ...parserSettings,
          fillEmptyIntervalsKeys: true,
        };
      }
    }

    return parserSettings;
  }
  /**
   * Transforms analysis results to unified interface
   * @return {ParserOutput} Parsed analysis results
   */
  parseQueryResults(input: ParserInput): ParserOutput {
    const transformationHandler = TRANSFORMATIONS[this.transformation];

    if (transformationHandler) {
      try {
        return transformationHandler(
          input,
          this.parserSettings,
          this.visualization
        );
      } catch (err) {
        console.error(`${PREFIX} - analysis results cannot be transformed`);
      }
    } else {
      console.error(`${PREFIX} - the provided data cannot be classified`);
    }

    return {
      keys: [],
      data: [],
    };
  }
}

export default DataParser;
