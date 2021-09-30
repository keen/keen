import { KEEN_KEY } from '@keen.io/parser';

import { transformData } from './transformations';
import { exportToCSV } from './csv';

import {
  VisualizationExport,
  RawExport,
  ExportOutput,
  CSVExport,
} from './types';

class DataExport {
  /**
   * Creates CSV file structure from export output
   */
  public static exportToCSV(payload: CSVExport): string {
    const { data, lineDelimiter, columnDelimiter } = payload;
    return exportToCSV(data, columnDelimiter, lineDelimiter);
  }

  /**
   * Creates data export structure with raw data
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
   * Creates data export structure with visualization context
   */
  public static exportVisualizationData(
    payload: VisualizationExport
  ): ExportOutput {
    return transformData(payload);
  }
}

export default DataExport;
