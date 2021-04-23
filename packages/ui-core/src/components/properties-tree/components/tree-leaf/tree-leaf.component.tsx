import React, { FC, useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { transparentize } from 'polished';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';
import Tooltip from '../../../tooltip';
import Portal from '../../../portal';

import { Container, Type } from './tree-leaf.styles';

import { SEPARATOR, PADDING } from './constants';

type Props = {
  /** Property name */
  propertyName: string;
  /** Property path */
  propertyPath: string;
  /** Property type */
  propertyType: string;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLDivElement>, propertyPath: string) => void;
  /** Active indicator */
  isActive?: boolean;
  /** Deepness level */
  deepnessLevel: number;
  /** Modal container selector */
  modalContainer: string;
};

const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

const TreeLeaf: FC<Props> = ({
  onClick,
  propertyName,
  propertyType,
  propertyPath,
  isActive,
  deepnessLevel,
  modalContainer,
}) => {
  const [isEllipsisActive, setEllipsis] = useState(false);

  const nameRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const element = nameRef.current;
    const contentOverflow = element.offsetWidth < element.scrollWidth;
    setEllipsis(contentOverflow);
  }, [propertyPath]);

  return (
    <Container
      style={{ paddingLeft: PADDING + deepnessLevel * PADDING }}
      isActive={isActive}
      onMouseMove={(e) => {
        if (isEllipsisActive) {
          setTooltip({ x: e.pageX, y: e.pageY, visible: true });
        }
      }}
      onMouseLeave={() => {
        if (isEllipsisActive) setTooltip({ x: 0, y: 0, visible: false });
      }}
      onClick={(e) => onClick(e, propertyPath)}
    >
      <BodyText
        ref={nameRef}
        variant="body2"
        lineHeight={1}
        color={colors.blue[500]}
        enableTextEllipsis
      >
        {propertyName}
      </BodyText>
      <Type>
        <BodyText
          variant="body2"
          lineHeight={1}
          color={transparentize(0.5, colors.black[500])}
        >
          {propertyType}
        </BodyText>
      </Type>
      <AnimatePresence>
        {tooltip.visible && (
          <Portal modalContainer={modalContainer}>
            <motion.div
              {...tooltipMotion}
              data-testid="property-tooltip"
              initial={{ opacity: 0, x: tooltip.x, y: tooltip.y }}
              animate={{
                x: tooltip.x,
                y: tooltip.y,
                opacity: 1,
              }}
              style={{
                zIndex: 2,
                position: 'absolute',
                pointerEvents: 'none',
              }}
            >
              <Tooltip mode="dark" hasArrow={false}>
                {propertyPath
                  .split(SEPARATOR)
                  .map((path: string, idx: number, collection) => (
                    <BodyText
                      key={idx}
                      variant="body2"
                      color={colors.white[500]}
                      fontWeight={
                        idx + 1 === collection.length ? 'bold' : 'normal'
                      }
                    >
                      {idx > 0 ? '.' : ''}
                      {path}
                    </BodyText>
                  ))}
              </Tooltip>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default TreeLeaf;
