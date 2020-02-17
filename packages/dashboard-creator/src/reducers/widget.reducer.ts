import { ADD_WIDGET, SET_WIDGETS, UPDATE_WIDGETS_POSITION } from '../constants';

import { Widget, ActionTypes, UpdateWidgetsPositionAction } from '../types';

type ReducerState = {
  widgets: Record<string, Widget>;
};

const initialState: ReducerState = {
  widgets: {},
};

const reduceWidgetsPosition = (
  state: ReducerState,
  action: UpdateWidgetsPositionAction
) => {
  const widgets = state.widgets;
  Object.keys(action.payload.widgets).forEach((id: string) => {
    const position = action.payload.widgets[id];
    widgets[id].position = position;
  });
  return {
    widgets,
  };
};

export const widgetReducer = (
  state: ReducerState = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case UPDATE_WIDGETS_POSITION:
      return {
        ...state,
        ...reduceWidgetsPosition(state, action),
      };
    case SET_WIDGETS:
      return {
        ...state,
        widgets: {
          ...state.widgets,
          ...action.payload.widgets,
        },
      };
    case ADD_WIDGET:
      return {
        ...state,
        widgets: {
          ...state.widgets,
          [action.payload.widgetId]: {
            id: action.payload.widgetId,
            position: action.payload.position,
          },
        },
      };
    default:
      return state;
  }
};
