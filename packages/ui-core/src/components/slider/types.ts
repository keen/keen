import {
  SET_DIMENSION,
  SET_VALUE,
  SET_DRAG_POSITION,
  SET_DRAG_MOVING,
  SET_DRAG_STATE,
} from './constants';

export type Controls = {
  number?: 1 | 2;
  size?: number;
  background?: string;
  border?: string;
};

export type OffRangeType = {
  background?: string;
};

export type Interval = {
  minimum: number;
  maximum: number;
  step: number;
};

export type DragConstraints = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

export type RailSettings = {
  size: number;
  borderRadius: number;
};

export type ControlSettings = {
  count?: number;
  size: number;
  backgroundColor: string;
  borderColor: string;
};

/* Actions */

interface SetControlPositionAction {
  type: typeof SET_DRAG_POSITION;
  payload: {
    position: number;
  };
}

interface SetControlDragAction {
  type: typeof SET_DRAG_MOVING;
  payload: {
    moving: boolean;
  };
}

interface SetControlState {
  type: typeof SET_DRAG_STATE;
  payload: {
    active: boolean;
  };
}

interface SetDimensionAction {
  type: typeof SET_DIMENSION;
  payload: {
    dimension: number;
  };
}

interface SetValueAction {
  type: typeof SET_VALUE;
  payload: {
    value: number | [number, number];
  };
}

export type SliderActions =
  | SetDimensionAction
  | SetValueAction
  | SetControlState
  | SetControlPositionAction
  | SetControlDragAction;
