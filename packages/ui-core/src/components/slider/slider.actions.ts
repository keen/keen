import {
  SET_DIMENSION,
  SET_VALUE,
  SET_DRAG_POSITION,
  SET_DRAG_STATE,
  SET_DRAG_MOVING,
} from './constants';

import { SliderActions } from './types';

const setDimension = (dimension: number): SliderActions => ({
  type: SET_DIMENSION,
  payload: { dimension },
});

const setValue = (value: number | [number, number]): SliderActions => ({
  type: SET_VALUE,
  payload: { value },
});

const setControlPosition = (id: string, position: number): SliderActions => ({
  type: SET_DRAG_POSITION,
  payload: { id, position },
});

const setControlDrag = (id: string, moving: boolean): SliderActions => ({
  type: SET_DRAG_MOVING,
  payload: { id, moving },
});

const setControlState = (id: string, active: boolean): SliderActions => ({
  type: SET_DRAG_STATE,
  payload: { id, active },
});

export const sliderActions = {
  setValue,
  setDimension,
  setControlState,
  setControlPosition,
  setControlDrag,
};
