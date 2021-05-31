import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';

import { useOnClickOutside } from '@keen.io/react-hooks';
import { Icon } from '@keen.io/icons';
import { colors as styleColors } from '@keen.io/colors';

import { mutateArray } from '../../utils';

import Dropdown from '../dropdown';
import ColorPicker from '../color-picker';

import { SortableContainer, AddColorButton } from './color-palette.styles';
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
  /** Max number of colors */
  maxNumberOfColors?: number;
};

const ColorPalette = ({
  colors: palette,
  onColorsChange,
  colorSuggestions,
  initialPickerColor = '#00FF00',
  maxNumberOfColors = 14,
}: Props) => {
  const [isDragged, setIsDragged] = useState(false);
  const [colors, setColors] = useState(palette);
  const [activeColor, setActiveColor] = useState(null);
  const [addColorPickerOpen, setAddColorPickerOpen] = useState(false);
  const colorsOrderRef = useRef(colors);
  const sortableContainerRef = useRef(null);
  const containerRef = useRef(null);

  const onColorPickerClickOutside = useCallback(() => {
    if (addColorPickerOpen) {
      setAddColorPickerOpen(false);
    }
  }, [containerRef, addColorPickerOpen]);

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
    colorsOrderRef.current = [...palette];
    setColors([...palette]);
  }, [palette]);

  useEffect(() => {
    new Sortable(sortableContainerRef.current, {
      animation: 200,
      handle: '.drag-handle',
      onStart: () => {
        setIsDragged(true);
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
        setColors(colorsOrderRef.current);
        setIsDragged(false);
      },
    });
  }, [colors]);

  return (
    <SortableContainer ref={sortableContainerRef}>
      {colors.map((color, id) => (
        <Color
          color={color}
          key={color + id}
          isDragged={isDragged}
          toggleColorPicker={(color) => toggleColorPicker(color)}
          onColorChange={(color) => onColorChange(color)}
          activeColorPicker={activeColor}
          colorSuggestions={colorSuggestions}
          onDelete={(color) => onColorDelete(color)}
        />
      ))}
      {colors.length < maxNumberOfColors && (
        <div ref={containerRef} className="add-color-button-wrapper">
          <AddColorButton
            onClick={() => setAddColorPickerOpen(true)}
            data-testid="add-color-button"
          >
            <Icon type="plus" fill={styleColors.gray[500]} width={18} />
          </AddColorButton>
          <Dropdown isOpen={addColorPickerOpen} fullWidth={false}>
            <ColorPicker
              color={initialPickerColor}
              colorSuggestions={colorSuggestions}
              onClosePicker={() => setAddColorPickerOpen(false)}
              onColorChange={(color) => {
                addColor(color);
                setAddColorPickerOpen(false);
              }}
            />
          </Dropdown>
        </div>
      )}
    </SortableContainer>
  );
};

export default ColorPalette;
