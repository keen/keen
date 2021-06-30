import React, { useState } from 'react';
import TypographySettings from './typography-settings.component';
import { FontSettings } from './types';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Components / Typography Settings',
  parameters: {
    component: TypographySettings,
    componentSubtitle: 'Displays customized typography settings',
  },
};

export const Basic = () => {
  const initialSettings = {
    color: 'green',
    size: 12,
    bold: true,
    italic: false,
    underline: true,
    alignment: 'left',
  } as FontSettings;

  const [settings, setSettings] = useState(initialSettings);

  return (
    <TypographySettings
      settings={settings}
      colorSuggestions={['red', 'green', 'blue']}
      fontSizeSuggestions={[10, 12, 16, 18]}
      onChange={(newSettings) => {
        action('change')(newSettings);
        setSettings(newSettings);
      }}
    />
  );
};

Basic.story = {
  parameters: {
    docs: {
      storyDescription: 'Typography settings',
    },
  },
};
