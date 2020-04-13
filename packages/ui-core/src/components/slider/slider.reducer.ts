import {
  SET_DIMENSION,
  SET_VALUE,
  SET_DRAG_MOVING,
  SET_DRAG_POSITION,
  SET_DRAG_STATE,
  DRAG_CONTROL_ID,
} from './constants';

import { SliderActions } from './types';

type SliderState = {
  value: number | [number, number];
  dimension: number;
  dragControls: Record<
    string,
    {
      active: boolean;
      moving: boolean;
      position: number;
    }
  >;
};

export const initialState: SliderState = {
  value: 0,
  dimension: 0,
  dragControls: {
    [DRAG_CONTROL_ID]: {
      moving: false,
      active: false,
      position: 0,
    },
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
        dragControls: {
          ...state.dragControls,
          [action.payload.id]: {
            ...state.dragControls[action.payload.id],
            active: action.payload.active,
          },
        },
      };
    case SET_DRAG_POSITION:
      return {
        ...state,
        dragControls: {
          ...state.dragControls,
          [action.payload.id]: {
            ...state.dragControls[action.payload.id],
            position: action.payload.position,
          },
        },
      };
    case SET_DRAG_MOVING:
      return {
        ...state,
        dragControls: {
          ...state.dragControls,
          [action.payload.id]: {
            ...state.dragControls[action.payload.id],
            moving: action.payload.moving,
          },
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
