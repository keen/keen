import React, { FC, RefObject, useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '@keen.io/react-hooks';

import { ColorBox, DropdownWrapper, ColorWrapper } from './color.styles';
import DynamicPortal from '../dynamic-portal';
import Dropdown from '../dropdown';
import ColorPicker from '../color-picker';

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
  const [colorPickerPosition, setColorPickerPosition] = useState({
    x: 0,
    y: 0,
  });
  const [modalScrollY, setModalScrollY] = useState(0);
  const dropdownRef = useRef(null);
  const pickerRef = useRef(null);

  const onClickOutsideColorPicker = () => {
    if (colorPickerVisible) {
      setColorPickerVisible(false);
    }
  };

  useOnClickOutside(pickerRef, onClickOutsideColorPicker);

  const changeColor = (color: string) => {
    setColor(color);
    onColorChange(color);
    setColorPickerVisible(false);
  };

  const setPickerPosition = () => {
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    setColorPickerPosition({
      x: dropdownRect.x,
      y: dropdownRect.y + window.scrollY + dropdownRect.height + modalScrollY,
    });
  };

  const hidePicker = () => {
    setColorPickerVisible(false);
  };

  useEffect(() => {
    scrollableContainerRef?.current?.addEventListener('scroll', hidePicker);
    return () => {
      scrollableContainerRef?.current?.removeEventListener(
        'scroll',
        hidePicker
      );
    };
  }, [scrollableContainerRef]);

  return (
    <ColorWrapper
      ref={dropdownRef}
      onMouseEnter={() => {
        setModalScrollY(0);
        setPickerPosition();
      }}
    >
      <ColorBox
        data-testid="color-selector"
        background={color}
        onClick={() => {
          setPickerPosition();
          setColorPickerVisible(true);
        }}
      />
      <DynamicPortal>
        <DropdownWrapper
          x={colorPickerPosition.x}
          y={colorPickerPosition.y}
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
