import React, { FC } from 'react';
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
  /** Change open state handler */
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
}) => (
  <>
    <TitleContainer
      onClick={() => {
        if (onChange) onChange(!isOpen);
      }}
      whileHover={{ backgroundColor: transparentize(0.5, colors.green[100]) }}
    >
      <Headline variant="h3" enableTextEllipsis>
        {title}
      </Headline>
      <IconContainer
        variants={iconMotion}
        initial="close"
        animate={isOpen ? 'open' : 'close'}
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
      {isOpen && (
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

export default Accordion;
