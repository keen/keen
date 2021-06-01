import {
  SET_ACTIVE_COLOR,
  SET_ADD_COLOR_PICKER_OPEN,
  SET_COLOR_PICKER_POSITION,
  SET_COLORS,
  SET_IS_DRAGGED,
} from './constants';
import { ColorPaletteActions } from './types';

export const initialState = {
  isDragged: false,
  colors: [] as string[],
  activeColor: '',
  addColorPickerOpen: false,
  colorPickerPosition: { x: 0, y: 0 },
};

export const colorPaletteReducer = (
  state = initialState,
  action: ColorPaletteActions
) => {
  switch (action.type) {
    case SET_IS_DRAGGED:
      return {
        ...state,
        isDragged: action.payload.isDragged,
      };
    case SET_COLORS:
      return {
        ...state,
        colors: action.payload.colors,
      };
    case SET_ACTIVE_COLOR:
      return {
        ...state,
        activeColor: action.payload.color,
      };
    case SET_ADD_COLOR_PICKER_OPEN:
      return {
        ...state,
        addColorPickerOpen: action.payload.addColorPickerOpen,
      };
    case SET_COLOR_PICKER_POSITION:
      return {
        ...state,
        colorPickerPosition: action.payload.colorPickerPosition,
      };
    default:
      return state;
  }
};
