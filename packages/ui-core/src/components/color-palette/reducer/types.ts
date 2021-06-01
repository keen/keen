import {
  SET_ACTIVE_COLOR,
  SET_ADD_COLOR_PICKER_OPEN,
  SET_COLOR_PICKER_POSITION,
  SET_COLORS,
  SET_IS_DRAGGED,
} from './constants';

interface SetIsDragged {
  type: typeof SET_IS_DRAGGED;
  payload: {
    isDragged: boolean;
  };
}

interface SetColors {
  type: typeof SET_COLORS;
  payload: {
    colors: string[];
  };
}

interface SetActiveColor {
  type: typeof SET_ACTIVE_COLOR;
  payload: {
    color: string;
  };
}

interface SetAddColorPickerOpen {
  type: typeof SET_ADD_COLOR_PICKER_OPEN;
  payload: {
    addColorPickerOpen: boolean;
  };
}

interface SetColorPickerPosition {
  type: typeof SET_COLOR_PICKER_POSITION;
  payload: {
    colorPickerPosition: { x: number; y: number };
  };
}

export type ColorPaletteActions =
  | SetIsDragged
  | SetColors
  | SetActiveColor
  | SetAddColorPickerOpen
  | SetColorPickerPosition;
