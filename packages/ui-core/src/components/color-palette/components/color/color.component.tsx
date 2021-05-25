import * as React from 'react';
import { StyledColor, DragHandle, DeleteButton } from './color.styles';
import { useCallback, useRef, useState } from 'react';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';
import { useOnClickOutside } from '@keen.io/react-hooks';

import Dropdown from '../../../dropdown';
import ColorPicker from '../../../color-picker';

type Props = {
  color: string;
  isDragged: boolean;
  onDelete: (color: string) => void;
  activeColorPicker: string;
  toggleColorPicker: (color: string) => void;
  onColorChange: (color: string) => void;
  colorSuggestions: string[];
};
const Color = ({
  color,
  isDragged,
  onDelete,
  toggleColorPicker,
  activeColorPicker,
  onColorChange,
  colorSuggestions,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const onClickOutside = useCallback(() => {
    if (activeColorPicker === color) {
      toggleColorPicker(null);
    }
  }, [containerRef, activeColorPicker]);

  useOnClickOutside(containerRef, onClickOutside);

  return (
    <div ref={containerRef}>
      <StyledColor
        color={color}
        onClick={() => toggleColorPicker(color)}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && !isDragged && (
          <div>
            <DragHandle className="drag-handle">
              <Icon type="drag" fill={colors.black[100]} width={10} />
            </DragHandle>
            <DeleteButton onClick={() => onDelete(color)}>
              <Icon type="close" fill={colors.black[100]} width={8} />
            </DeleteButton>
          </div>
        )}
      </StyledColor>
      <Dropdown isOpen={activeColorPicker === color} fullWidth={false}>
        <ColorPicker
          color={color}
          colorSuggestions={colorSuggestions}
          onClosePicker={() => toggleColorPicker(color)}
          onColorChange={onColorChange}
        />
      </Dropdown>
    </div>
  );
};

export default Color;
