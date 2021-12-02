import React from 'react';
import { render as rtlRender, waitFor } from '@testing-library/react';
import { Typography } from '@keen.io/ui-core';

import GaugeProgress from './gauge-progress.component';

const render = (overProps: any = {}) => {
  const typography: Typography = {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    fontFamily: 'Lato Regular, sans-serif',
    fontColor: 'black',
  };

  const props = {
    progressType: 'percent',
    minimum: 0,
    maximum: 200,
    value: 50,
    isAutoApplied: false,
    typography,
    ...overProps,
  };

  const wrapper = rtlRender(
    <svg>
      <GaugeProgress {...props} />
    </svg>
  );

  return {
    wrapper,
    props,
  };
};

test('should apply "typography" on SVG text element', () => {
  const {
    wrapper: { container },
  } = render();

  expect(container).toMatchInlineSnapshot(`
    <div>
      <svg>
        <text
          fill="black"
          style="font-style: normal; font-weight: normal; font-size: 14px; font-family: Lato Regular, sans-serif;"
          text-anchor="middle"
        >
          0
          <tspan
            style="font-size: 7px;"
          >
            %
          </tspan>
        </text>
      </svg>
    </div>
  `);
});

test('should calculate and display percentage value', async () => {
  const {
    wrapper: { container },
  } = render();

  const textElement = container.getElementsByTagName('text');
  await waitFor(() => {
    expect(textElement[0].textContent).toEqual('25%');
  });
});

test('should display progress value', async () => {
  const {
    wrapper: { container },
  } = render({ progressType: 'normal' });

  const textElement = container.getElementsByTagName('text');

  await waitFor(() => {
    expect(textElement[0].textContent).toEqual('50');
  });
});

test('should display "100%" as progress value when maximum is not provided', async () => {
  const {
    wrapper: { container },
  } = render({ maximum: null });

  const textElement = container.getElementsByTagName('text');
  await waitFor(() => {
    expect(textElement[0].textContent).toEqual('100%');
  });
});

test('should display "100%" as progress value when maximum and minimum are equal', async () => {
  const {
    wrapper: { container },
  } = render({ maximum: 100, minimum: 100 });

  const textElement = container.getElementsByTagName('text');
  await waitFor(() => {
    expect(textElement[0].textContent).toEqual('100%');
  });
});

test('should display "100%" as progress value when any of "auto" values have been applied', async () => {
  const {
    wrapper: { container },
  } = render({ maximum: 100, minimum: 10, isAutoApplied: true });

  const textElement = container.getElementsByTagName('text');
  await waitFor(() => {
    expect(textElement[0].textContent).toEqual('100%');
  });
});
