import React, { FC } from 'react';
import { Icon } from '@keen.io/icons';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import { Header, MotionIcon } from './tree-node.styles';

import { PADDING } from './constants';
import { KEYBOARD_KEYS } from '../../../../constants';

type Props = {
  /** Node name */
  name: string;
  /** Open indicator */
  isOpen: boolean;
  /** Click event handler */
  onClick: () => void;
  /** Deepness level */
  deepnessLevel: number;
};

const TreeNode: FC<Props> = ({ name, deepnessLevel, isOpen, onClick }) => (
  <Header
    style={{ paddingLeft: PADDING + deepnessLevel * PADDING }}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.keyCode === KEYBOARD_KEYS.ENTER) onClick();
    }}
    tabIndex={0}
  >
    <BodyText
      variant="body2"
      color={colors.blue[500]}
      fontWeight="bold"
      lineHeight={1}
      enableTextEllipsis
    >
      {name}
    </BodyText>
    <MotionIcon
      initial={false}
      animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
    >
      <Icon type="caret-right" fill={colors.blue[500]} width={10} height={10} />
    </MotionIcon>
  </Header>
);

export default TreeNode;
