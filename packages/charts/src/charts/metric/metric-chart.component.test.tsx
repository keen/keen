import React from 'react';
import { mount } from 'enzyme';

import MetricChart from './metric-chart.component';

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
    findLabel: () => wrapper.find('[data-test="metric-label"]'),
    findExcerptContainer: () =>
      wrapper.find('[data-test="metric-excerpt-container"]'),
    findExcerptLabel: () => wrapper.find('[data-test="metric-excerpt-label"]'),
  };
};

describe('@keen.io/charts - <MetricChart />', () => {
  it('should render "previous" and "current" metric labels', () => {
    const { findLabel, findExcerptLabel } = setup();

    const label = findLabel();
    const excerptLabel = findExcerptLabel();

    expect(label.length).toBeTruthy();
    expect(excerptLabel.length).toBeTruthy();
  });

  it('should not display "excerpt" container for signle metric', () => {
    const { findExcerptContainer } = setup({
      data: [chartData[0]],
    });
    const container = findExcerptContainer().first();

    expect(container.length).toBeFalsy();
  });

  it('should apply "typography" theming properties on metric label', () => {
    const { findLabel } = setup();
    const label = findLabel().first();

    expect(label.props()).toMatchInlineSnapshot(`
      Object {
        "children": Array [
          undefined,
          3281,
          undefined,
        ],
        "data-test": "metric-label",
        "fontColor": "#27566D",
        "fontFamily": "Lato Light, sans-serif",
        "fontSize": 60,
        "fontStyle": "normal",
        "fontWeight": "normal",
      }
    `);
  });

  it('should apply "typography" theming properties on excerpt label', () => {
    const { findExcerptLabel } = setup();
    const label = findExcerptLabel().first();

    expect(label.props()).toMatchInlineSnapshot(`
      Object {
        "children": "2.2k",
        "data-test": "metric-excerpt-label",
        "fontColor": "#1D2729",
        "fontFamily": "Lato Regular, sans-serif",
        "fontSize": 16,
        "fontStyle": "normal",
        "fontWeight": "normal",
      }
    `);
  });

  it('should apply "backgroundColor" property on "excerpt" container', () => {
    const { findExcerptContainer } = setup();
    const container = findExcerptContainer().first();

    expect(container.props()).toMatchInlineSnapshot(`
      Object {
        "background": "#ECF5F7",
        "children": <ForwardRef(styled.div)>
          <Text
            data-test="metric-excerpt-label"
            fontColor="#1D2729"
            fontFamily="Lato Regular, sans-serif"
            fontSize={16}
            fontStyle="normal"
            fontWeight="normal"
          >
            2.2k
          </Text>
        </ForwardRef(styled.div)>,
        "data-test": "metric-excerpt-container",
      }
    `);
  });

  it('should render label prefix based on "labelPrefix" property', () => {
    const { findLabel } = setup({ labelPrefix: 'Total ' });
    const label = findLabel().first();

    expect(label.text()).toMatchInlineSnapshot(`"Total 3281"`);
  });

  it('should render label suffix based on "labelSuffix" property', () => {
    const { findLabel } = setup({ labelPrefix: ' Qty.' });
    const label = findLabel().first();

    expect(label.text()).toMatchInlineSnapshot(`" Qty.3281"`);
  });
});
