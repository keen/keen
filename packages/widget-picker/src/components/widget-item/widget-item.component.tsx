import React, { FC, useState, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Icon, IconType } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import {
  Container,
  SettingsContainer,
  MotionChartSettings,
} from './widget-item.styles';

import { HIDE_TIME } from './constants';

type Props = {
  /** Icon type */
  icon: IconType;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Active indicator */
  isActive?: boolean;
  /** Widget options indicator */
  hasOptions: boolean;
  /** React children nodes */
  children?: React.ReactNode;
};

const settingsMotion = {
  initial: { right: -15, opacity: 0 },
  animate: { right: -3, opacity: 1 },
  exit: { right: -30, opacity: 0 },
};

const WidgetItem: FC<Props> = ({
  icon,
  onClick,
  isActive,
  hasOptions,
  children,
}) => {
  const [settingsVisible, setSettingsVisibility] = useState(false);
  const hideTrigger = useRef(null);

  const hideSettings = useCallback(() => {
    if (hideTrigger.current) clearTimeout(hideTrigger.current);
    hideTrigger.current = setTimeout(() => {
      setSettingsVisibility(false);
    }, HIDE_TIME);
  }, []);

  const showSettings = useCallback(() => {
    if (hideTrigger.current) clearTimeout(hideTrigger.current);
    setSettingsVisibility(true);
  }, []);

  return (
    <Container
      data-testid="widget-item"
      isActive={isActive || settingsVisible}
      onClick={e => !isActive && onClick(e)}
    >
      <Icon width={18} height={18} type={icon} fill={colors.blue[500]} />
      {hasOptions && (
        <SettingsContainer
          data-testid="settings-tick"
          onMouseEnter={() => showSettings()}
          onMouseLeave={() => hideSettings()}
        >
          <Icon
            width={10}
            height={15}
            type="corner-tick"
            fill={colors.lightBlue[500]}
          />
        </SettingsContainer>
      )}
      <AnimatePresence>
        {settingsVisible && (
          <MotionChartSettings
            {...settingsMotion}
            onMouseEnter={() => showSettings()}
            onMouseLeave={() => hideSettings()}
          >
            {children}
          </MotionChartSettings>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default WidgetItem;
