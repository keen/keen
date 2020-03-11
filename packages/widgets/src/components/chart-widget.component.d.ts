import React from 'react';
import { CardSettings } from '@keen.io/ui-core';
import { LegendSettings } from '../types';
declare type Props = {
  children: React.ReactNode;
  cardSettings: CardSettings;
  legendSettings: Pick<LegendSettings, 'position' | 'layout' | 'alignment'>;
};
declare const ChartWidget: ({
  children,
  cardSettings,
  legendSettings,
}: Props) => JSX.Element;
export default ChartWidget;
