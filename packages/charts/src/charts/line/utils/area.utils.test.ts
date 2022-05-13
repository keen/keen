import { generateGroupedLines, generateStackLines } from './chart.utils';
import { lineChart } from '../line-chart.fixtures';
import { Options } from '../types';

jest.mock('uuid', () => {
  let value = 1;
  return {
    v4: () => value++,
  };
});

describe('grouped lines', () => {
  test('should generate area correctly when series are negative', () => {
    const data = [
      { label: '2020-01-01T00:00:00.000Z', sale: -3, buy: -11, revenue: -30 },
      { label: '2020-03-01T00:00:00.000Z', sale: -12, buy: -3, revenue: -21 },
      { label: '2020-02-01T00:00:00.000Z', sale: -3, buy: -11, revenue: -30 },
    ];

    const lineChartSettings: Options = {
      data,
      ...lineChart,
      areaMode: true,
    };

    const { areas } = generateGroupedLines(lineChartSettings);

    expect(areas).toMatchInlineSnapshot(`
      Array [
        Object {
          "d": "M10,10L939.0322580645161,10L490,10L490,46.99999999999999L939.0322580645161,158L10,46.99999999999999Z",
          "gradientZeroPercent": 0,
          "id": 1,
          "negativeColor": "rgba(255, 0, 0, 0.8)",
          "positiveColor": "rgba(255, 0, 0, 0.2)",
          "zeroPointColor": "rgba(255, 0, 0, 0.2)",
        },
        Object {
          "d": "M10,10L939.0322580645161,10L490,10L490,145.66666666666669L939.0322580645161,46.99999999999999L10,145.66666666666669Z",
          "gradientZeroPercent": 0,
          "id": 2,
          "negativeColor": "rgba(0, 128, 0, 0.8)",
          "positiveColor": "rgba(0, 128, 0, 0.2)",
          "zeroPointColor": "rgba(0, 128, 0, 0.2)",
        },
        Object {
          "d": "M10,10L939.0322580645161,10L490,10L490,380L939.0322580645161,269L10,380Z",
          "gradientZeroPercent": 0,
          "id": 3,
          "negativeColor": "rgba(0, 0, 255, 0.8)",
          "positiveColor": "rgba(0, 0, 255, 0.2)",
          "zeroPointColor": "rgba(0, 0, 255, 0.2)",
        },
      ]
    `);
  });

  test('should generate area correctly when series are not negative', () => {
    const data = [
      { label: '2020-01-01T00:00:00.000Z', sale: 3, buy: 11, revenue: 30 },
      { label: '2020-03-01T00:00:00.000Z', sale: 12, buy: 3, revenue: 21 },
      { label: '2020-02-01T00:00:00.000Z', sale: 3, buy: 11, revenue: 30 },
    ];

    const lineChartSettings: Options = {
      data,
      ...lineChart,
      areaMode: true,
    };

    const { areas } = generateGroupedLines(lineChartSettings);

    expect(areas).toMatchInlineSnapshot(`
      Array [
        Object {
          "d": "M10,343L939.0322580645161,232L490,343L490,380L939.0322580645161,380L10,380Z",
          "gradientZeroPercent": 100,
          "id": 4,
          "negativeColor": "rgba(255, 0, 0, 0.2)",
          "positiveColor": "rgba(255, 0, 0, 0.8)",
          "zeroPointColor": "rgba(255, 0, 0, 0.2)",
        },
        Object {
          "d": "M10,244.33333333333331L939.0322580645161,343L490,244.33333333333331L490,380L939.0322580645161,380L10,380Z",
          "gradientZeroPercent": 100,
          "id": 5,
          "negativeColor": "rgba(0, 128, 0, 0.2)",
          "positiveColor": "rgba(0, 128, 0, 0.8)",
          "zeroPointColor": "rgba(0, 128, 0, 0.2)",
        },
        Object {
          "d": "M10,10L939.0322580645161,121.00000000000001L490,10L490,380L939.0322580645161,380L10,380Z",
          "gradientZeroPercent": 100,
          "id": 6,
          "negativeColor": "rgba(0, 0, 255, 0.2)",
          "positiveColor": "rgba(0, 0, 255, 0.8)",
          "zeroPointColor": "rgba(0, 0, 255, 0.2)",
        },
      ]
    `);
  });
});

describe('stack lines', () => {
  test('should generate area correctly when series is negative', () => {
    const data = [
      { label: '2020-01-01T00:00:00.000Z', sale: -3, buy: -11, revenue: -30 },
      { label: '2020-03-01T00:00:00.000Z', sale: -12, buy: -3, revenue: -21 },
      { label: '2020-02-01T00:00:00.000Z', sale: -3, buy: -11, revenue: -30 },
    ];

    const lineChartSettings: Options = {
      data,
      ...lineChart,
      areaMode: true,
    };

    const { areas } = generateStackLines(lineChartSettings);

    expect(areas).toMatchInlineSnapshot(`
      Array [
        Object {
          "d": "M10,10L939.0322580645161,10L490,10 L490,34.666666666666664L939.0322580645161,108.66666666666669L10,34.666666666666664",
          "gradientZeroPercent": 0,
          "id": 7,
          "negativeColor": "rgba(255, 0, 0, 0.7)",
          "positiveColor": "rgba(255, 0, 0, 0.3)",
          "zeroPointColor": "rgba(255, 0, 0, 0.3)",
        },
        Object {
          "d": "M10,34.666666666666664L939.0322580645161,108.66666666666669L490,34.666666666666664 L490,125.11111111111111L939.0322580645161,133.33333333333334L10,125.11111111111111",
          "gradientZeroPercent": 0,
          "id": 8,
          "negativeColor": "rgba(0, 0, 255, 0.7)",
          "positiveColor": "rgba(0, 0, 255, 0.3)",
          "zeroPointColor": "rgba(0, 0, 255, 0.3)",
        },
        Object {
          "d": "M10,125.11111111111111L939.0322580645161,133.33333333333334L490,125.11111111111111 L490,371.77777777777777L939.0322580645161,306L10,371.77777777777777",
          "gradientZeroPercent": 0,
          "id": 9,
          "negativeColor": "rgba(0, 128, 0, 0.7)",
          "positiveColor": "rgba(0, 128, 0, 0.3)",
          "zeroPointColor": "rgba(0, 128, 0, 0.3)",
        },
      ]
    `);
  });

  test('should generate area correctly when series is not negative', () => {
    const data = [
      { label: '2020-01-01T00:00:00.000Z', sale: 3, buy: 11, revenue: 30 },
      { label: '2020-03-01T00:00:00.000Z', sale: 12, buy: 3, revenue: 21 },
      { label: '2020-02-01T00:00:00.000Z', sale: 3, buy: 11, revenue: 30 },
    ];

    const lineChartSettings: Options = {
      data,
      ...lineChart,
      areaMode: true,
    };

    const { areas } = generateGroupedLines(lineChartSettings);

    expect(areas).toMatchInlineSnapshot(`
      Array [
        Object {
          "d": "M10,343L939.0322580645161,232L490,343L490,380L939.0322580645161,380L10,380Z",
          "gradientZeroPercent": 100,
          "id": 10,
          "negativeColor": "rgba(255, 0, 0, 0.2)",
          "positiveColor": "rgba(255, 0, 0, 0.8)",
          "zeroPointColor": "rgba(255, 0, 0, 0.2)",
        },
        Object {
          "d": "M10,244.33333333333331L939.0322580645161,343L490,244.33333333333331L490,380L939.0322580645161,380L10,380Z",
          "gradientZeroPercent": 100,
          "id": 11,
          "negativeColor": "rgba(0, 128, 0, 0.2)",
          "positiveColor": "rgba(0, 128, 0, 0.8)",
          "zeroPointColor": "rgba(0, 128, 0, 0.2)",
        },
        Object {
          "d": "M10,10L939.0322580645161,121.00000000000001L490,10L490,380L939.0322580645161,380L10,380Z",
          "gradientZeroPercent": 100,
          "id": 12,
          "negativeColor": "rgba(0, 0, 255, 0.2)",
          "positiveColor": "rgba(0, 0, 255, 0.8)",
          "zeroPointColor": "rgba(0, 0, 255, 0.2)",
        },
      ]
    `);
  });
});
