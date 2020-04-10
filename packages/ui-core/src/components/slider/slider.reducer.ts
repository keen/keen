import {
  SET_DIMENSION,
  SET_VALUE,
  SET_DRAG_MOVING,
  SET_DRAG_POSITION,
  SET_DRAG_STATE,
} from './constants';

import { SliderActions } from './types';

type SliderState = {
  value: number | [number, number];
  dimension: number;
  dragControl: {
    active: boolean;
    moving: boolean;
    position: number;
  };
};

export const initialState: SliderState = {
  value: 0,
  dimension: 0,
  dragControl: {
    moving: false,
    active: false,
    position: 0,
  },
};

export const sliderReducer = (
  state: SliderState = initialState,
  action: SliderActions
) => {
  switch (action.type) {
    case SET_DRAG_STATE:
      return {
        ...state,
        dragControl: {
          ...state.dragControl,
          active: action.payload.active,
        },
      };
    case SET_DRAG_POSITION:
      return {
        ...state,
        dragControl: {
          ...state.dragControl,
          position: action.payload.position,
        },
      };
    case SET_DRAG_MOVING:
      return {
        ...state,
        dragControl: {
          ...state.dragControl,
          moving: action.payload.moving,
        },
      };
    case SET_DIMENSION:
      return {
        ...state,
        dimension: action.payload.dimension,
      };
    case SET_VALUE:
      return {
        ...state,
        value: action.payload.value,
      };
    default:
      return state;
  }
};
