import React, { FC, useState, useRef, useEffect, useCallback } from 'react';
import { transparentize } from 'polished';
import { Dropdown } from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import OptionHeader from '../option-header';
import {
  Bar,
  Container,
  CaretDown,
  ColorIndicator,
  Grid,
  ColorTone,
  DropdownContainer,
  Square,
} from './color-picker.styles';

type Props = {
  /** Current selected color*/
  currentColor?: string;
  /** Select color event handler */
  onSelectColor: (color: string) => void;
};

const ColorPicker: FC<Props> = ({ currentColor, onSelectColor }) => {
  const [isOpen, setOpen] = useState(false);

  const containerRef = useRef(null);
  const outsideClick = useCallback(
    (e) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    },
    [isOpen, containerRef]
  );

  useEffect(() => {
    document.addEventListener('click', outsideClick);
    return () => document.removeEventListener('click', outsideClick);
  }, [isOpen, containerRef]);

  return (
    <Container ref={containerRef}>
      <OptionHeader onClick={() => setOpen(true)}>
        <ColorIndicator data-testid="color-indicator">
          <Icon type="text" fill={colors.black[100]} width={13} height={13} />
          <Bar
            style={{
              background: currentColor ? currentColor : colors.black[100],
            }}
          />
        </ColorIndicator>
        <CaretDown>
          <Icon
            type="caret-down"
            width={10}
            height={10}
            fill={transparentize(0.3, colors.blue[500])}
          />
        </CaretDown>
      </OptionHeader>
      <DropdownContainer>
        <Dropdown isOpen={isOpen}>
          <Grid>
            {Object.keys(colors).map((name) => (
              <ColorTone key={name} data-testid={`color-tone-${name}`}>
                {Object.keys(colors[name]).map((saturation) => (
                  <Square
                    key={saturation}
                    data-testid={`color-${colors[name][saturation]}`}
                    onClick={() => onSelectColor(colors[name][saturation])}
                    style={{ background: colors[name][saturation] }}
                  />
                ))}
              </ColorTone>
            ))}
          </Grid>
        </Dropdown>
      </DropdownContainer>
    </Container>
  );
};

export default ColorPicker;
