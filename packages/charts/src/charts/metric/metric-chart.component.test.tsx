import React from 'react';
import { mount } from 'enzyme';

import MetricChart from './metric-chart.component';
import { theme as defaultTheme } from '../../theme';

import { chartData } from './metric-chart.fixtures';

const setup = (overProps: any = {}) => {
  const props = {
    data: chartData,
    labelSelector: 'day',
    keys: ['users'],
    ...overProps,
  };

  const wrapper = mount(<MetricChart {...props} />);

  return {
    wrapper,
    props,
    findValue: () => wrapper.find('[data-test="metric-value"]'),
    findExcerptContainer: () =>
      wrapper.find('[data-test="metric-excerpt-container"]'),
    findExcerpt: () => wrapper.find('[data-test="metric-excerpt-value"]'),
    findPrefix: () => wrapper.find('[data-test="metric-prefix"]'),
    findSuffix: () => wrapper.find('[data-test="metric-suffix"]'),
  };
};

describe('@keen.io/charts - <MetricChart />', () => {
  it('should apply format function', () => {
    const mockFn = jest.fn().mockImplementation((value) => `Total ${value}`);
    const { findValue } = setup({ formatValue: mockFn });

    const label = findValue().first();

    expect(mockFn).toHaveBeenCalled();
    expect(label.text()).toMatchInlineSnapshot(`"Total 3281"`);
  });

  it('should render <Excerpt /> component with percent difference', () => {
    const { findExcerpt } = setup({
      type: 'difference',
      usePercentDifference: true,
    });
    const excerpt = findExcerpt().first();

    expect(excerpt.text()).toMatchInlineSnapshot(`"49.14%"`);
  });

  it('should render <Excerpt /> component with value difference', () => {
    const { findExcerpt } = setup({ type: 'difference' });
    const excerpt = findExcerpt().first();

    expect(excerpt.text()).toMatchInlineSnapshot(`"1.1k"`);
  });

  it('should render <Excerpt /> component with compared value', () => {
    const { findExcerpt } = setup({ type: 'comparison' });
    const excerpt = findExcerpt().first();

    expect(excerpt.text()).toMatchInlineSnapshot(`"1.1k"`);
  });

  it('should not render <Excerpt /> component for metric with single data serie', () => {
    const [firstSerie] = chartData;
    const { findExcerpt } = setup({
      data: [firstSerie],
    });

    const excerpt = findExcerpt().first();

    expect(excerpt.length).toBeFalsy();
  });

  it('should apply "typography" theming properties on metric value', () => {
    const { findValue } = setup();
    const value = findValue().first();
    const { metric } = defaultTheme;

    expect(value.props()).toMatchObject(metric.value.typography);
  });

  it('should apply "typography" theming properties on excerpt label', () => {
    const { findExcerpt } = setup({ type: 'difference' });
    const excerpt = findExcerpt().first();
    const { metric } = defaultTheme;

    expect(excerpt.props()).toMatchObject(metric.excerpt.typography);
  });

  it('should apply "backgroundColor" property on "excerpt" container', () => {
    const { findExcerptContainer } = setup({ type: 'difference' });
    const excerptContainer = findExcerptContainer().first();
    const { metric } = defaultTheme;

    expect(excerptContainer.props()).toMatchObject({
      background: metric.excerpt.backgroundColor,
    });
  });

  it('should render prefix if provided', () => {
    const valuePrefix = 'prefix';
    const { findPrefix } = setup({ valuePrefix });
    const prefix = findPrefix().first();

    expect(prefix.text()).toEqual(valuePrefix);
  });

  it('should apply "fontSize" property on prefix', () => {
    const valuePrefix = 'prefix';
    const { findPrefix } = setup({ valuePrefix });
    const prefix = findPrefix().first();
    const { metric } = defaultTheme;

    expect(prefix.props()).toMatchObject({
      fontSize: metric.prefix.typography.fontSize,
    });
  });

  it('should render suffix if provided', () => {
    const valueSuffix = 'suffix';
    const { findSuffix } = setup({ valueSuffix });
    const suffix = findSuffix().first();

    expect(suffix.text()).toEqual(valueSuffix);
  });

  it('should apply "fontSize" property on suffix', () => {
    const valueSuffix = 'suffix';
    const { findSuffix } = setup({ valueSuffix });
    const suffix = findSuffix().first();
    const { metric } = defaultTheme;

    expect(suffix.props()).toMatchObject({
      fontSize: metric.suffix.typography.fontSize,
    });
  });
});
