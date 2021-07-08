import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import Header from './header.component';

import { theme } from '../../../../theme';

const render = (overProps: any = {}) => {
  const props = {
    theme,
    percentageValue: 50,
    value: 1000,
    label: 'Logins',
    ...overProps,
  };

  const wrapper = rtlRender(<Header {...props} />);

  return {
    props,
    wrapper,
  };
};

test('renders "value" element for step', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText(`${props.value}`);

  expect(element).toBeInTheDocument();
});

test('applies font size from theme "typography" on value element', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText(`${props.value}`);

  expect(element.getAttribute('font-size')).toEqual('20');
});

test('applies font family from theme "typography" on value element', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText(`${props.value}`);

  expect(element.getAttribute('font-family')).toEqual('Lato, sans-serif');
});

test('do not renders value element based on theme configuration', () => {
  const chartTheme = {
    ...theme,
    funnel: {
      ...theme.funnel,
      header: {
        ...theme.funnel.header,
        value: {
          ...theme.funnel.header.value,
          enabled: false,
        },
      },
    },
  };

  const {
    wrapper: { queryByText },
    props,
  } = render({
    theme: chartTheme,
  });

  expect(queryByText(`${props.value}`)).not.toBeInTheDocument();
});

test('renders "label" element', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  expect(getByText(props.label)).toBeInTheDocument();
});

test('applies font size from theme "typography" on label element', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText(props.label);

  expect(element.getAttribute('font-size')).toEqual('13');
});

test('applies font family from theme "typography" on label element', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText(props.label);

  expect(element.getAttribute('font-family')).toEqual('Lato, sans-serif');
});

test('renders "badge" element with percentage value', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText(`${props.percentageValue}%`);

  expect(element).toBeInTheDocument();
});

test('do not renders "badge" element based on theme configuration', () => {
  const chartTheme = {
    ...theme,
    funnel: {
      ...theme.funnel,
      header: {
        ...theme.funnel.header,
        badge: {
          ...theme.funnel.header.badge,
          enabled: false,
        },
      },
    },
  };
  const {
    wrapper: { queryByText },
    props,
  } = render({ theme: chartTheme });
  const element = queryByText(`${props.percentageValue}%`);

  expect(element).not.toBeInTheDocument();
});

test('applies font size from theme "typography" on badge element', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText(`${props.percentageValue}%`);

  expect(element.getAttribute('font-size')).toEqual('12');
});

test('applies font family from theme "typography" on badge element', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText(`${props.percentageValue}%`);

  expect(element.getAttribute('font-family')).toEqual('Lato, sans-serif');
});

test('applies "title" data attribute on step label', () => {
  const {
    wrapper: { getByTitle },
    props,
  } = render();
  const element = getByTitle(props.label);

  expect(element).toBeInTheDocument();
});
