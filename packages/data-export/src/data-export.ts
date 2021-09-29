/* eslint-disable  @typescript-eslint/no-empty-function */
import { KEEN_KEY } from '@keen.io/parser';

import { VisualizationExport, RawExport, ExportOutput } from './types';

class DataExport {
  /**
   * Creates CSV file structure with raw data
   */
  public static exportRawData({ keys, data }: RawExport): ExportOutput {
    const columns: string[] = [KEEN_KEY, ...keys];

    return [
      columns,
      data.map((item: Record<string, any>) => [
        ...keys.map((keyName) => [item[KEEN_KEY], item[keyName]]),
      ]),
    ];
  }

  /**
   * Creates CSV file structure with visualization context
   */
  public static exportVisualizationData({}: VisualizationExport): ExportOutput {
    return [];
  }
}

export default DataExport;
