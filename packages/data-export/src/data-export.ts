/* eslint-disable  @typescript-eslint/no-empty-function */

import { VisualizationExport } from './types';

class DataExport {
  /**
   * Creates CSV file structure with raw data
   */
  public static exportRawData() {}

  /**
   * Creates CSV file structure with visualization context
   */
  public static exportVisualizationData({}: VisualizationExport) {}
}

export default DataExport;
