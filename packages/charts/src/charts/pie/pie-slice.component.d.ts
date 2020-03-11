import React, { FC } from 'react';
import { Arc, DefaultArcObject } from 'd3-shape';
declare type Props = {
  draw: Arc<any, DefaultArcObject>;
  drawActive: Arc<any, DefaultArcObject>;
  startAngle: number;
  endAngle: number;
  autocolor: boolean;
  labelPosition: [number, number];
  activePosition: [number, number];
  label: string;
  background: string;
  onMouseMove: (e: React.MouseEvent<SVGGElement, MouseEvent>) => void;
  onMouseLeave: (e: React.MouseEvent<SVGGElement, MouseEvent>) => void;
};
declare const PieSlice: FC<Props>;
export default PieSlice;
