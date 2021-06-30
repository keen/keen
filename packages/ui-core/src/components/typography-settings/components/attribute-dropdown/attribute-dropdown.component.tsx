import React, { FC, useState, useRef, useCallback, useEffect } from 'react';
import Dropdown from '../../../dropdown';
import { UI_LAYERS } from '../../../../constants';

import { Container } from './attribute-dropdown.styles';
import OptionHeader from '../option-header';
import { BodyText } from '@keen.io/typography';

type Props = {
  /** React children nodes */
  children: React.ReactNode;
  /** Header renderer */
  renderHeader: () => React.ReactNode;
};

const AttributeDropdown: FC<Props> = ({ children, renderHeader }) => {
  const containerRef = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    if (isOpen && containerRef.current) {
      setOpen(false);
    }
  }, [isOpen, containerRef]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen, containerRef]);

  return (
    <Container ref={containerRef}>
      <BodyText variant="body2">
        <OptionHeader
          data-testid="rich-utils-header"
          onClick={() => setOpen(true)}
        >
          {renderHeader()}
        </OptionHeader>
        <div style={{ zIndex: UI_LAYERS.dropdown }}>
          <Dropdown isOpen={isOpen}>{children}</Dropdown>
        </div>
      </BodyText>
    </Container>
  );
};

export default AttributeDropdown;
