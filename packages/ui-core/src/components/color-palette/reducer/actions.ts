import {
  SET_ACTIVE_COLOR,
  SET_ADD_COLOR_PICKER_OPEN,
  SET_COLOR_PICKER_POSITION,
  SET_COLORS,
  SET_IS_DRAGGED,
} from './constants';
import { ColorPaletteActions } from './types';

const setIsDragged = (isDragged: boolean): ColorPaletteActions => ({
  type: SET_IS_DRAGGED,
  payload: { isDragged },
});

const setColors = (colors: string[]): ColorPaletteActions => ({
  type: SET_COLORS,
  payload: { colors },
});

const setActiveColor = (color: string): ColorPaletteActions => ({
  type: SET_ACTIVE_COLOR,
  payload: { color },
});

const setAddColorPickerOpen = (
  addColorPickerOpen: boolean
): ColorPaletteActions => ({
  type: SET_ADD_COLOR_PICKER_OPEN,
  payload: { addColorPickerOpen },
});

const setColorPickerPosition = (colorPickerPosition: {
  x: number;
  y: number;
}): ColorPaletteActions => ({
  type: SET_COLOR_PICKER_POSITION,
  payload: { colorPickerPosition },
});

export const colorPaletteActions = {
  setIsDragged,
  setColors,
  setActiveColor,
  setAddColorPickerOpen,
  setColorPickerPosition,
};
