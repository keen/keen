import uuid from 'uuid/v4';

import { GridElementsPosition } from './components';

import { GridPosition } from './types';

export const generateId = () => uuid();

export const transformWidgetsPosition = (elements: GridElementsPosition) => {
  const widgets: Record<string, GridPosition> = {};
  elements.forEach(({ i: widgetId, w, h, x, y }) => {
    widgets[widgetId] = { w, h, x, y };
  });
  return widgets;
};
