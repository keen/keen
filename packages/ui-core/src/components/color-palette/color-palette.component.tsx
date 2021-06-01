import * as React from 'react';
import { RefObject, useCallback, useEffect, useReducer, useRef } from 'react';
import Sortable from 'sortablejs';

import { useOnClickOutside } from '@keen.io/react-hooks';
import { Icon } from '@keen.io/icons';
import { colors as styleColors } from '@keen.io/colors';

import { mutateArray } from '../../utils';

import Dropdown from '../dropdown';
import ColorPicker from '../color-picker';

import {
  SortableContainer,
  AddColorButton,
  StyledContainer,
} from './color-palette.styles';
import { Color } from './components/color';
import { DynamicPortal } from '../index';
import { colorPaletteReducer, initialState } from './reducer/reducer';
import { sliderActions } from './reducer/actions';

type Props = {
  /** Colors of the palette */
  colors: string[];
  /** Color suggestions available in color picker */
  colorSuggestions: string[];
  /** Function which will be triggered after color change, addition/deletion of color or order change */
  onColorsChange: (colors: string[]) => void;
  /** Default color value for color picker */
  initialPickerColor?: string;
  /** Max number of colors */
  maxNumberOfColors?: number;
  /** Ref of scrollable parent element */
  scrollableParentRef?: RefObject<HTMLDivElement>;
};

const ColorPalette = ({
  colors: palette,
  onColorsChange,
  colorSuggestions,
  initialPickerColor = '#00FF00',
  maxNumberOfColors = 14,
  scrollableParentRef,
}: Props) => {
  const [
    { isDragged, colors, activeColor, addColorPickerOpen, colorPickerPosition },
    dispatch,
  ] = useReducer(colorPaletteReducer, initialState);

  const colorsOrderRef = useRef(colors);
  const sortableContainerRef = useRef(null);
  const colorPickerDropdownRef = useRef(null);
  const addColorButtonRef = useRef(null);

  const onColorPickerClickOutside = useCallback(() => {
    if (addColorPickerOpen) {
      dispatch(sliderActions.setAddColorPickerOpen(false));
    }
  }, [colorPickerDropdownRef, addColorPickerOpen]);

  useOnClickOutside(colorPickerDropdownRef, onColorPickerClickOutside);

  const onColorDelete = (deletedColor: string) => {
    const filteredColors = colorsOrderRef.current.filter(
      (color: string) => color !== deletedColor
    );
    colorsOrderRef.current = filteredColors;
    dispatch(sliderActions.setColors(filteredColors));
    onColorsChange(filteredColors);
  };

  const toggleColorPicker = (color: string) => {
    if (color === activeColor) {
      return dispatch(sliderActions.setActiveColor(null));
    }
    dispatch(sliderActions.setActiveColor(color));
  };

  const onColorChange = (color: string) => {
    const colorToChangeIndex = colorsOrderRef.current.indexOf(activeColor);
    colorsOrderRef.current[colorToChangeIndex] = color;
    dispatch(sliderActions.setColors(colorsOrderRef.current));
    toggleColorPicker(null);
    onColorsChange(colorsOrderRef.current);
  };

  const addColor = (color: string) => {
    colorsOrderRef.current.push(color);
    dispatch(sliderActions.setColors(colorsOrderRef.current));
    toggleColorPicker(null);
    onColorsChange(colorsOrderRef.current);
  };

  useEffect(() => {
    colorsOrderRef.current = [...palette];
    dispatch(sliderActions.setColors([...palette]));
  }, [palette]);

  const hideColorPicker = useCallback(() => {
    dispatch(sliderActions.setAddColorPickerOpen(false));
  }, [sliderActions.setAddColorPickerOpen]);

  useEffect(() => {
    const scrollableRef = scrollableParentRef?.current;
    scrollableRef?.addEventListener('scroll', hideColorPicker);
    return () => {
      scrollableRef?.removeEventListener('scroll', hideColorPicker);
    };
  }, [scrollableParentRef, hideColorPicker]);

  useEffect(() => {
    new Sortable(sortableContainerRef.current, {
      animation: 200,
      handle: '.drag-handle',
      onStart: () => {
        sliderActions.setIsDragged(true);
      },
      onMove: (event) => {
        return !event.related.classList.contains('add-color-button-wrapper');
      },
      onEnd: (evt) => {
        colorsOrderRef.current = mutateArray(
          colorsOrderRef.current,
          evt.oldIndex,
          evt.newIndex
        );
        onColorsChange(colorsOrderRef.current);
        dispatch(sliderActions.setColors(colorsOrderRef.current));
        dispatch(sliderActions.setIsDragged(false));
      },
    });
  }, [colors]);

  const setPickerPosition = () => {
    const addColorButtonRect = addColorButtonRef.current.getBoundingClientRect();
    dispatch(
      sliderActions.setColorPickerPosition({
        x: addColorButtonRect.x,
        y: addColorButtonRect.y + window.scrollY + addColorButtonRect.height,
      })
    );
  };

  return (
    <SortableContainer ref={sortableContainerRef}>
      {colors.map((color: string, id: number) => (
        <Color
          color={color}
          key={color + id}
          isDragged={isDragged}
          toggleColorPicker={(color) => toggleColorPicker(color)}
          onColorChange={(color) => onColorChange(color)}
          activeColorPicker={activeColor}
          colorSuggestions={colorSuggestions}
          onDelete={(color) => onColorDelete(color)}
          scrollableParentRef={scrollableParentRef}
        />
      ))}
      {colors.length < maxNumberOfColors && (
        <div className="add-color-button-wrapper">
          <AddColorButton
            onClick={() => {
              setPickerPosition();
              dispatch(sliderActions.setAddColorPickerOpen(true));
            }}
            data-testid="add-color-button"
            ref={addColorButtonRef}
          >
            <Icon type="plus" fill={styleColors.gray[500]} width={18} />
          </AddColorButton>
          {addColorPickerOpen && (
            <DynamicPortal>
              <StyledContainer
                x={colorPickerPosition.x}
                y={colorPickerPosition.y}
                ref={colorPickerDropdownRef}
              >
                <Dropdown isOpen fullWidth={false}>
                  <ColorPicker
                    color={initialPickerColor}
                    colorSuggestions={colorSuggestions}
                    onClosePicker={() =>
                      dispatch(sliderActions.setAddColorPickerOpen(false))
                    }
                    onColorChange={(color) => {
                      addColor(color);
                      dispatch(sliderActions.setAddColorPickerOpen(false));
                    }}
                  />
                </Dropdown>
              </StyledContainer>
            </DynamicPortal>
          )}
        </div>
      )}
    </SortableContainer>
  );
};

export default ColorPalette;
