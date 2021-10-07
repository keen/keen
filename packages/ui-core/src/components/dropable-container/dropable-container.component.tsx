import React, { FC, useRef, useCallback, useEffect } from 'react';
import { transparentize } from 'polished';

import { colors } from '@keen.io/colors';
import { Icon } from '@keen.io/icons';

import {
  Container,
  Placeholder,
  SearchIcon,
  DropIndicator,
  Input,
} from './dropable-container.styles';
import { DropableContainerVariant } from './types';
import { KEYBOARD_KEYS } from '../../constants';

type Props = {
  /** Active indicator */
  isActive: boolean;
  /** React children nodes */
  children?: React.ReactNode;
  /** Click event handler */
  onClick?: (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<Element>
  ) => void;
  /** Container defocus event handler */
  onDefocus?: (e: MouseEvent) => void;
  /** Component variant */
  variant?: DropableContainerVariant;
  /** Search feature flag */
  searchable?: boolean;
  /** Shows drop indicator */
  dropIndicator?: boolean;
  /** Property value */
  value?: string | Record<string, any>;
  /** Value placeholder */
  placeholder?: string | (() => JSX.Element);
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Search event handler */
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Error */
  hasError?: boolean;
  /** Custom border radius */
  borderRadius?: string;
};

const DropableContainer: FC<Props> = ({
  onClick,
  value,
  placeholder,
  children,
  isActive,
  onDefocus,
  onSearch,
  searchable,
  searchPlaceholder,
  dropIndicator,
  variant = 'primary',
  hasError = false,
  borderRadius,
}) => {
  const containerRef = useRef(null);
  const outsideClick = useCallback(
    (e) => {
      if (
        isActive &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        if (onDefocus) onDefocus(e);
      }
    },
    [isActive, containerRef, onDefocus]
  );

  useEffect(() => {
    document.addEventListener('click', outsideClick);
    return () => document.removeEventListener('click', outsideClick);
  }, [isActive, containerRef]);

  const PlaceholderContent = () => {
    if (typeof placeholder === 'function') {
      return placeholder();
    }
    return <Placeholder>{placeholder}</Placeholder>;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === KEYBOARD_KEYS.ENTER) {
      onClick(e);
    }
  };

  return (
    <Container
      role="button"
      data-testid="dropable-container"
      isActive={isActive}
      variant={variant}
      hasError={hasError}
      onClick={onClick}
      onKeyDown={onKeyDown}
      ref={containerRef}
      tabIndex={0}
      borderRadius={borderRadius}
    >
      {searchable && isActive ? (
        <>
          <SearchIcon>
            <Icon
              type="search"
              fill={transparentize(0.3, colors.blue[500])}
              width={15}
              height={15}
            />
          </SearchIcon>
          <Input
            type="text"
            autoFocus
            data-testid="dropable-container-input"
            placeholder={typeof value === 'string' ? value : searchPlaceholder}
            onChange={onSearch}
          />
        </>
      ) : (
        <>
          {value && <>{children}</>}
          {placeholder && !value && <PlaceholderContent />}
        </>
      )}
      {dropIndicator && (
        <DropIndicator data-testid="drop-indicator">
          <Icon
            type="caret-down"
            fill={transparentize(0.3, colors.blue[500])}
            width={10}
            height={10}
          />
        </DropIndicator>
      )}
    </Container>
  );
};

export default DropableContainer;
