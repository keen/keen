import { KEEN_KEY } from '@keen.io/parser';

import { transformData } from './transformations';
import { VisualizationExport, RawExport, ExportOutput } from './types';

class DataExport {
  /**
   * Creates CSV file structure with raw data
   */
  public static exportRawData({ keys, data }: RawExport): ExportOutput {
    const columns: string[] = [KEEN_KEY, ...keys];

    return [
      columns,
      ...data.map((item: Record<string, any>) => [
        item[KEEN_KEY],
        ...keys.map((keyName) => item[keyName]),
      ]),
    ];
  }

  /**
   * Creates CSV file structure with visualization context
   */
  public static exportVisualizationData(
    payload: VisualizationExport
  ): ExportOutput {
    return transformData(payload);
  }
}

export default DataExport;
