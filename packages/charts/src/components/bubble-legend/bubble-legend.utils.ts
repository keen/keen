import { scaleLinear } from 'd3-scale';

export const legendRadius = [10, 25, 40];

export const opacityScale = (domain: number[], minOpacity: number) =>
  scaleLinear()
    .domain(domain)
    .range([0.9, minOpacity]);

export const radiusScale = (
  minRadius: number,
  maxRadius: number,
  maxRange: number
) =>
  scaleLinear()
    .domain([minRadius, maxRadius])
    .range([0, maxRange]);

export const verticalPositionScale = (maxRadius: number) =>
  scaleLinear()
    .domain([0, maxRadius])
    .range([0, maxRadius * 2]);

export const sortByValue = (values: number[]) => values.sort((a, b) => a - b);
