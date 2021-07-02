import React, { FC, useState, useRef, RefObject } from 'react';
import {
  useDynamicContentPosition,
  useOnParentScroll,
  useOnClickOutside,
} from '@keen.io/react-hooks';

import Dropdown from '../../../dropdown';
import DynamicPortal from '../../../dynamic-portal';
import OptionHeader from '../option-header';
import { Container, DropdownWrapper } from './attribute-dropdown.styles';

type Props = {
  /** React children nodes */
  children: React.ReactNode;
  /** Header renderer */
  renderHeader: () => React.ReactNode;
  /** Ref to scrollable parent element - it can be used to hide dropdown on scroll event */
  scrollableContainerRef?: RefObject<HTMLDivElement>;
};

const AttributeDropdown: FC<Props> = ({
  scrollableContainerRef,
  children,
  renderHeader,
}) => {
  const containerRef = useRef(null);
  const [isOpen, setOpen] = useState(false);

  useOnClickOutside(containerRef, () => setOpen(false));
  useOnParentScroll(scrollableContainerRef, () => setOpen(false));
  const { setPosition, contentPosition } = useDynamicContentPosition(
    containerRef
  );

  return (
    <Container ref={containerRef}>
      <OptionHeader
        data-testid="rich-utils-header"
        onClick={() => {
          setPosition();
          setOpen(true);
        }}
      >
        {renderHeader()}
      </OptionHeader>
      <DynamicPortal>
        <DropdownWrapper x={contentPosition.x} y={contentPosition.y}>
          <Dropdown isOpen={isOpen}>{children}</Dropdown>
        </DropdownWrapper>
      </DynamicPortal>
    </Container>
  );
};

export default AttributeDropdown;
