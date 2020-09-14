import React, { FC } from 'react';
import { Icon, IconType } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Container } from './widget-item.styles';

import { Settings } from '../../types';

type Props = {
  /** Icon type */
  icon: IconType;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Current widget settings */
  settings: Settings;
  /** Active indicator */
  isActive?: boolean;
};

const WidgetItem: FC<Props> = ({ icon, onClick, isActive }) => {
  return (
    <Container isActive={isActive} onClick={e => !isActive && onClick(e)}>
      <Icon type={icon} fill={colors.blue[500]} />
    </Container>
  );
};

export default WidgetItem;
