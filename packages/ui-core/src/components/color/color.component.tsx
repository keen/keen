import React, { FC, RefObject, useRef, useState } from 'react';
import {
  useOnClickOutside,
  useDynamicContentPosition,
  useOnParentScroll,
} from '@keen.io/react-hooks';

import DynamicPortal from '../dynamic-portal';
import Dropdown from '../dropdown';
import ColorPicker from '../color-picker';

import { ColorBox, DropdownWrapper, ColorWrapper } from './color.styles';

type Props = {
  color: string;
  colorSuggestions: string[];
  onColorChange: (color: string) => void;
  scrollableContainerRef?: RefObject<HTMLDivElement>;
};

const Color: FC<Props> = ({
  color: initialColor,
  onColorChange,
  colorSuggestions,
  scrollableContainerRef,
}) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [color, setColor] = useState(initialColor);

  const dropdownRef = useRef(null);
  const pickerRef = useRef(null);

  const onClickOutsideColorPicker = () => {
    if (colorPickerVisible) {
      setColorPickerVisible(false);
    }
  };

  useOnClickOutside(pickerRef, onClickOutsideColorPicker);
  useOnParentScroll(scrollableContainerRef, () => setColorPickerVisible(false));
  const { setPosition, contentPosition } =
    useDynamicContentPosition(dropdownRef);

  const changeColor = (color: string) => {
    setColor(color);
    onColorChange(color);
    setColorPickerVisible(false);
  };

  return (
    <ColorWrapper
      ref={dropdownRef}
      onMouseEnter={() => {
        setPosition();
      }}
    >
      <ColorBox
        data-testid="color-selector"
        background={color}
        onClick={() => {
          setPosition();
          setColorPickerVisible(true);
        }}
      />
      <DynamicPortal>
        <DropdownWrapper
          x={contentPosition.x}
          y={contentPosition.y}
          ref={pickerRef}
        >
          <Dropdown isOpen={colorPickerVisible}>
            <ColorPicker
              color={color}
              colorSuggestions={colorSuggestions}
              onColorChange={(color) => changeColor(color)}
              onClosePicker={() => setColorPickerVisible(false)}
            />
          </Dropdown>
        </DropdownWrapper>
      </DynamicPortal>
    </ColorWrapper>
  );
};

export default Color;
