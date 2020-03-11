import { Query, Step, AnalysisResult } from '@keen.io/parser';
import { Options } from './types';
declare class Visualizer {
  private type;
  private container;
  private widgetSettings?;
  private componentSettings?;
  constructor(options: Options);
  private setComponentSettings;
  private setWidgetSettings;
  render({
    query,
    steps,
    result,
  }: {
    query: Query;
    steps: Step[];
    result: AnalysisResult;
  }): void;
}
export default Visualizer;
