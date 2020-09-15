import React, { FC, useState, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Icon, IconType } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import {
  Container,
  SettingsContainer,
  MotionChartSettings,
} from './widget-item.styles';

import OptionsGroup from '../options-group';
import { mergeChartOptions } from './utils';

import { HIDE_TIME } from './constants';

import { ChartSettings, ChartOptions } from '../../types';

type Props = {
  /** Icon type */
  icon: IconType;
  /** Click event handler */
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Update chart settings event handler */
  onUpdateSettings: (settings: ChartSettings) => void;
  /** Current widget settings */
  settings: ChartSettings;
  /** Chart options */
  chartConfigurationOptions?: ChartOptions[];
  /** Active indicator */
  isActive?: boolean;
};

const settingsMotion = {
  initial: { right: -15, opacity: 0 },
  animate: { right: -3, opacity: 1 },
  exit: { right: -30, opacity: 0 },
};

const WidgetItem: FC<Props> = ({
  icon,
  onClick,
  onUpdateSettings,
  chartConfigurationOptions,
  settings,
  isActive,
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

  const hasChartConfiguration = !!(
    chartConfigurationOptions && chartConfigurationOptions.length
  );

  return (
    <Container
      isActive={isActive || settingsVisible}
      onClick={e => !isActive && onClick(e)}
    >
      <Icon width={18} height={18} type={icon} fill={colors.blue[500]} />
      {hasChartConfiguration && (
        <SettingsContainer
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
            {chartConfigurationOptions &&
              chartConfigurationOptions.map(options => (
                <OptionsGroup
                  key={options.id}
                  id={options.id}
                  title={options.label}
                  isActiveOption={isActive}
                  onClick={(_e, id, optionSettings) => {
                    const optionsGroup = mergeChartOptions(
                      id,
                      chartConfigurationOptions,
                      settings
                    );

                    onUpdateSettings({
                      ...optionsGroup,
                      ...optionSettings,
                    });
                  }}
                  settings={settings}
                  options={options.settings}
                />
              ))}
          </MotionChartSettings>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default WidgetItem;
