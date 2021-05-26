import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';

import { useOnClickOutside } from '@keen.io/react-hooks';
import { Icon } from '@keen.io/icons';
import { colors as styleColors } from '@keen.io/colors';

import { mutateArray } from '../../utils';

import Dropdown from '../dropdown';
import ColorPicker from '../color-picker';

import {
  StyledColorPalette,
  SortableContainer,
  AddColorButton,
} from './color-palette.styles';
import { Color } from './components/color';

type Props = {
  /** Colors of the palette */
  colors: string[];
  /** Color suggestions available in color picker */
  colorSuggestions: string[];
  /** Function which will be triggered after color change, addition/deletion of color or order change */
  onColorsChange: (colors: string[]) => void;
  /** Default color value for color picker */
  initialPickerColor?: string;
};

const ColorPalette = ({
  colors: palette,
  onColorsChange,
  colorSuggestions,
  initialPickerColor = '#00FF00',
}: Props) => {
  const [isDragged, setIsDragged] = useState(false);
  const [colors, setColors] = useState(palette);
  const [activeColor, setActiveColor] = useState(null);
  const colorsOrderRef = useRef(colors);
  const sortableContainerRef = useRef(null);
  const containerRef = useRef(null);

  const onColorPickerClickOutside = useCallback(() => {
    if (activeColor === initialPickerColor) {
      toggleColorPicker(null);
    }
  }, [containerRef, activeColor]);

  useOnClickOutside(containerRef, onColorPickerClickOutside);

  const onColorDelete = (deletedColor: string) => {
    const filteredColors = colorsOrderRef.current.filter(
      (color) => color !== deletedColor
    );
    colorsOrderRef.current = filteredColors;
    setColors(filteredColors);
    onColorsChange(filteredColors);
  };

  const toggleColorPicker = (color: string) => {
    if (color === activeColor) {
      return setActiveColor(null);
    }
    setActiveColor(color);
  };

  const onColorChange = (color: string) => {
    const colorToChangeIndex = colorsOrderRef.current.indexOf(activeColor);
    colorsOrderRef.current[colorToChangeIndex] = color;
    setColors(colorsOrderRef.current);
    toggleColorPicker(null);
    onColorsChange(colorsOrderRef.current);
  };

  const addColor = (color: string) => {
    colorsOrderRef.current.push(color);
    setColors(colorsOrderRef.current);
    toggleColorPicker(null);
    onColorsChange(colorsOrderRef.current);
  };

  useEffect(() => {
    new Sortable(sortableContainerRef.current, {
      animation: 200,
      handle: '.drag-handle',
      onStart: () => {
        setIsDragged(true);
      },
      onEnd: (evt) => {
        colorsOrderRef.current = mutateArray(
          colorsOrderRef.current,
          evt.oldIndex,
          evt.newIndex
        );
        setIsDragged(false);
        onColorsChange(colorsOrderRef.current);
      },
    });
  }, [colors]);

  return (
    <StyledColorPalette>
      <SortableContainer ref={sortableContainerRef}>
        {colors.map((color) => (
          <Color
            color={color}
            key={color}
            isDragged={isDragged}
            toggleColorPicker={(color) => toggleColorPicker(color)}
            onColorChange={(color) => onColorChange(color)}
            activeColorPicker={activeColor}
            colorSuggestions={colorSuggestions}
            onDelete={(color) => onColorDelete(color)}
          />
        ))}
      </SortableContainer>
      <div ref={containerRef}>
        <AddColorButton
          onClick={() => toggleColorPicker(initialPickerColor)}
          data-testid="add-color-button"
        >
          <Icon type="plus" fill={styleColors.gray[500]} width={18} />
        </AddColorButton>
        <Dropdown isOpen={activeColor === initialPickerColor} fullWidth={false}>
          <ColorPicker
            color={initialPickerColor}
            colorSuggestions={colorSuggestions}
            onClosePicker={() => toggleColorPicker(null)}
            onColorChange={(color) => addColor(color)}
          />
        </Dropdown>
      </div>
    </StyledColorPalette>
  );
};

export default ColorPalette;
