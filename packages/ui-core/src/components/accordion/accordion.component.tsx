import React, { FC, useState } from 'react';
import { transparentize } from 'polished';
import { AnimatePresence } from 'framer-motion';
import { Headline } from '@keen.io/typography';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { TitleContainer, IconContainer, Content } from './accordion.styles';
import { iconMotion, contentMotion } from './motion';

type Props = {
  /** Title */
  title: string;
  /** Accordion state */
  isOpen?: boolean;
  /** */
  onChange?: (isOpen: boolean) => void;
  /** Content max height */
  maxHeight?: number;
  /** React children nodes */
  children: React.ReactNode;
};

export const Accordion: FC<Props> = ({
  title,
  isOpen = false,
  onChange,
  maxHeight,
  children,
}) => {
  const [isAccordionOpen, setAccordionOpen] = useState(isOpen);

  return (
    <>
      <TitleContainer
        onClick={() => {
          if (onChange) onChange(!isAccordionOpen);
          setAccordionOpen(!isAccordionOpen);
        }}
        whileHover={{ backgroundColor: transparentize(0.5, colors.green[100]) }}
      >
        <Headline variant="h3" enableTextEllipsis>
          {title}
        </Headline>
        <IconContainer
          variants={iconMotion}
          initial="close"
          animate={isAccordionOpen ? 'open' : 'close'}
        >
          <Icon
            width={14}
            fill={colors.green[500]}
            opacity={0.7}
            type="caret-right"
          />
        </IconContainer>
      </TitleContainer>
      <AnimatePresence initial={false}>
        {isAccordionOpen && (
          <Content
            variants={contentMotion}
            initial="close"
            animate="open"
            exit="close"
            maxHeight={maxHeight}
          >
            {children}
          </Content>
        )}
      </AnimatePresence>
    </>
  );
};

export default Accordion;
