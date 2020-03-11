import React from 'react';
import { ContentDimension } from './legend.utils';
declare type Props = {
  children: React.ReactNode;
  contentDimension: ContentDimension;
  mode: 'vertical' | 'horizontal';
};
declare const LegendSlider: ({
  children,
  mode,
  contentDimension,
}: Props) => JSX.Element;
export default LegendSlider;
