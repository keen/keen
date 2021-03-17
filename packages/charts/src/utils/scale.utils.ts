import { scaleOrdinal } from 'd3-scale';

export const bubbleColorScale = (colors: string[]) => scaleOrdinal(colors);
