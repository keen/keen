import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import WidgetPicker from './widget-picker.component';
import { PickerWidgets } from '../../types';

const render = (
  overProps: Partial<ComponentProps<typeof WidgetPicker>> = {}
) => {
  const props = {
    widgets: ['area', 'table', 'json'] as PickerWidgets[],
    currentWidget: null,
    chartSettings: {},
    widgetSettings: {},
    disabledWidgetOptions: [],
    onUpdateSettings: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<WidgetPicker {...props} />);

  return {
    props,
    wrapper,
  };
};

test('renders widgets list based on configuration', () => {
  const {
    wrapper: { getByTestId },
  } = render();
  const element = getByTestId(`area-widget-container`);

  expect(element).toBeInTheDocument();
});

test('allows user to select visualization type with default settings', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render({ widgets: ['area'] });
  const element = getByTestId('settings-tick');
  fireEvent.click(element);

  expect(props.onUpdateSettings).toHaveBeenCalledWith(
    'area',
    {
      curve: 'linear',
      groupMode: 'grouped',
      stackMode: 'normal',
    },
    {}
  );
});

test('allows user to select chart settings', () => {
  const {
    wrapper: { getByTestId, getByText },
    props,
  } = render({ widgets: ['line'] });
  const element = getByTestId('settings-tick');
  fireEvent.mouseOver(element);

  const lineCurve = getByText('Spline');
  fireEvent.click(lineCurve);

  expect(props.onUpdateSettings).toHaveBeenCalledWith(
    'line',
    {
      areaMode: false,
      curve: 'spline',
      groupMode: 'grouped',
      stackMode: 'normal',
    },
    {}
  );
});

test('allows user to select widget settings', () => {
  const {
    wrapper: { getByTestId, getByText },
    props,
  } = render({ widgets: ['choropleth'] });
  const element = getByTestId('settings-tick');
  fireEvent.mouseOver(element);

  const choroplethMap = getByText('United States');
  fireEvent.click(choroplethMap);

  expect(props.onUpdateSettings).toHaveBeenCalledWith(
    'choropleth',
    {},
    {
      geographicArea: 'us',
    }
  );
});
