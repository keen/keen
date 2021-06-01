import * as React from 'react';
import { StyledColor, DragHandle, DeleteButton } from './color.styles';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';
import { useOnClickOutside } from '@keen.io/react-hooks';

import Dropdown from '../../../dropdown';
import ColorPicker from '../../../color-picker';
import DynamicPortal from '../../../dynamic-portal';
import { StyledContainer } from '../../color-palette.styles';

type Props = {
  color: string;
  isDragged: boolean;
  onDelete: (color: string) => void;
  activeColorPicker: string;
  toggleColorPicker: (color: string) => void;
  onColorChange: (color: string) => void;
  colorSuggestions: string[];
  scrollableParentRef?: RefObject<HTMLDivElement>;
};
const Color = ({
  color,
  isDragged,
  onDelete,
  toggleColorPicker,
  activeColorPicker,
  onColorChange,
  colorSuggestions,
  scrollableParentRef,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const colorPickerContainerRef = useRef(null);
  const [colorPickerPosition, setColorPickerPosition] = useState({
    x: 0,
    y: 0,
  });
  const colorButtonRef = useRef(null);

  const onClickOutside = useCallback(() => {
    if (activeColorPicker === color) {
      toggleColorPicker(null);
    }
  }, [colorPickerContainerRef, activeColorPicker]);

  useOnClickOutside(colorPickerContainerRef, onClickOutside);

  const setPickerPosition = () => {
    const colorButtonRect = colorButtonRef.current.getBoundingClientRect();
    setColorPickerPosition({
      x: colorButtonRect.x,
      y: colorButtonRect.y + window.scrollY + colorButtonRect.height,
    });
  };

  const hideColorPicker = useCallback(() => {
    toggleColorPicker(null);
  }, [toggleColorPicker]);

  useEffect(() => {
    const scrollableRef = scrollableParentRef?.current;
    scrollableRef?.addEventListener('scroll', hideColorPicker);
    return () => {
      scrollableRef?.removeEventListener('scroll', hideColorPicker);
    };
  }, [scrollableParentRef, hideColorPicker]);

  return (
    <div>
      <StyledColor
        data-testid="color"
        color={color}
        onClick={() => {
          setPickerPosition();
          toggleColorPicker(color);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={colorButtonRef}
      >
        {isHovered && !isDragged && (
          <div>
            <DragHandle className="drag-handle" data-testid="drag-handle">
              <Icon type="drag" fill={colors.black[100]} width={10} />
            </DragHandle>
            <DeleteButton
              onClick={() => onDelete(color)}
              data-testid="delete-button"
            >
              <Icon type="close" fill={colors.black[100]} width={8} />
            </DeleteButton>
          </div>
        )}
      </StyledColor>
      {activeColorPicker === color && (
        <DynamicPortal>
          <StyledContainer
            x={colorPickerPosition.x}
            y={colorPickerPosition.y}
            ref={colorPickerContainerRef}
          >
            <Dropdown isOpen={activeColorPicker === color} fullWidth={false}>
              <ColorPicker
                color={color}
                colorSuggestions={colorSuggestions}
                onClosePicker={() => toggleColorPicker(color)}
                onColorChange={onColorChange}
              />
            </Dropdown>
          </StyledContainer>
        </DynamicPortal>
      )}
    </div>
  );
};

export default Color;
