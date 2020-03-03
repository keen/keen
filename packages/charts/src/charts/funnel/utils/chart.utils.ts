import { line } from 'd3-shape';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import { Layout } from '@keen.io/ui-core';

import { Dimension, Margins } from '../../../types';

type Options = {
  data: Record<string, any>[];
  key: string;
  colors: string[];
  labelSelector: string;
};

type Step = {
  percentageValue: number;
  nextPercentageValue: number;
  value: number;
  color: string;
  index: number;
};

const createTrapezoid = (lines: any) =>
  line()
    .x((d: any) => d.x)
    .y((d: any) => d.y)(lines);

export const calculateStepPoints = ({
  scale,
  dimension,
  margins,
  percentageValue,
  nextPercentageValue,
  layout,
}: {
  percentageValue: number;
  nextPercentageValue: number;
  scale: ScaleLinear<number, number>;
  dimension: Dimension;
  margins: Margins;
  layout: Layout;
}) => {
  const { height, width } = dimension;

  if (layout === 'horizontal') {
    scale.range([margins.top, height - margins.bottom]);
  } else {
    scale.range([margins.left, width - margins.right]);
  }

  const middlePoint = scale(50);
  const startMax = scale(percentageValue) / 2;
  const endMax = scale(nextPercentageValue) / 2;

  const points =
    layout === 'horizontal'
      ? [
          {
            x: width,
            y: middlePoint + endMax,
          },
          {
            x: 0,
            y: middlePoint + startMax,
          },
          {
            x: 0,
            y: middlePoint - startMax,
          },
          {
            x: width,
            y: middlePoint - endMax,
          },
        ]
      : [
          {
            y: height,
            x: middlePoint + endMax,
          },
          {
            x: middlePoint + startMax,
            y: 0,
          },
          {
            x: middlePoint - startMax,
            y: 0,
          },
          {
            y: height,
            x: middlePoint - endMax,
          },
        ];

  return createTrapezoid(points as any);
};

export const generateFunnel = ({
  data,
  key,
  colors,
}: Options): { steps: Step[]; scale: ScaleLinear<number, number> } => {
  const [firstSeries] = data;
  const maximum = firstSeries[key];

  const stepsCount = data.length;
  const range = new Array(stepsCount).fill(true);

  const steps = range.reduce((acc, _item, index) => {
    const value = data[index][key];
    const percentageValue = (value / maximum) * 100;
    const isLastStep = index === stepsCount - 1;

    if (isLastStep) {
      return [
        ...acc,
        {
          nextPercentageValue: percentageValue,
          percentageValue,
          color: colors[index],
          value,
          index,
        },
      ];
    }

    return [
      ...acc,
      {
        percentageValue,
        nextPercentageValue: (data[index + 1][key] / maximum) * 100,
        value,
        color: colors[index],
        index,
      },
    ];
  }, []) as Step[];

  const scale = scaleLinear().domain([0, 100]);

  return {
    scale,
    steps,
  };
};
