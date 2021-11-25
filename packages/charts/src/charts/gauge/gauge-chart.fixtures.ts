export const chartData = [{ 'keen.key': 'Result', 'keen.value': 100 }];

export const gaugeChart = {
  data: [{ 'keen.key': 'Result', 'keen.value': 90 }],
  valueKey: 'keen.value',
  dimension: { width: 100, height: 100 },
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  colors: ['blue', 'red', 'green', 'violet'],
  startAngle: -110,
  endAngle: 100,
  colorMode: 'continuous',
  colorSteps: 3,
  minValue: 'auto',
  maxValue: 'auto',
} as any;
