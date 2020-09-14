import React, { FC } from 'react';

import { ChartSettingsOption, Settings } from '../../types';

type Props = {
  /** Settings identifier */
  id: string;
  /** Chart settings options */
  options: ChartSettingsOption[];
  /** Current settings */
  settings: Settings;
  /** Select option event handler */
  onClick: (
    e: React.MouseEvent<HTMLDivElement>,
    id: string,
    settings: Settings
  ) => void;
  /** Widget active indicator */
  isWidgetActive: boolean;
};

const ChartSettings: FC<Props> = ({
  id,
  options,
  settings,
  isWidgetActive,
  onClick,
}) => (
  <div>
    {options.map(({ label, isActive, defaultSettings }) => (
      <div key={label} onClick={e => onClick(e, id, defaultSettings)}>
        {label}
        {isWidgetActive && isActive(settings) && '(active)'}
      </div>
    ))}
  </div>
);

export default ChartSettings;
