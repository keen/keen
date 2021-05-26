import * as React from 'react';
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import { StyledColorPicker, Buttons } from './color-picker.styles';
import Button from '../button';

type Props = {
  /** selected color inside picker */
  color: string;
  /** available color suggestions */
  colorSuggestions: string[];
  /** function which will be called on color change */
  onColorChange: (color: string) => void;
  /** function which will be called on color picker close */
  onClosePicker: () => void;
};

const ColorPicker = ({
  color,
  onClosePicker,
  onColorChange,
  colorSuggestions,
}: Props) => {
  const [selectedColor, setColor] = useState(color);
  return (
    <StyledColorPicker data-testid="color-picker">
      <SketchPicker
        disableAlpha
        color={selectedColor}
        onChange={(colorResult) => setColor(colorResult.hex)}
        presetColors={colorSuggestions}
      />
      <Buttons>
        <Button
          onClick={() => onColorChange(selectedColor)}
          variant="secondary"
          size="small"
        >
          Save
        </Button>
        <Button
          onClick={onClosePicker}
          variant="secondary"
          size="small"
          style="outline"
        >
          Cancel
        </Button>
      </Buttons>
    </StyledColorPicker>
  );
};

export default ColorPicker;
