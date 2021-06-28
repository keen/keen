import React, { FC, RefObject } from 'react';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';
import { Container, Separator, TextOption } from './typography-settings.styles';
import { FontSize, TextAlignment } from './components';
import { DEFAULT_FONT_SIZES, FONT_STYLES } from './constants';
import { FontSettings } from './types';
import { Color } from '../index';

type Props = {
  /** Settings that are customizable */
  settings: FontSettings;
  /** Function that will be called on settings change with new settings as a parameter */
  onChange: (settings: FontSettings) => void;
  /** Color suggestions that will be available in color selector */
  colorSuggestions?: string[];
  /** Font size suggestions that will be available in font size dropdown */
  fontSizeSuggestions?: number[];
  /** Ref to scrollable parent element - it can be used to hide color picker or dropdowns on scroll event */
  scrollableContainerRef?: RefObject<HTMLDivElement>;
};

const TypographySettings: FC<Props> = ({
  settings,
  onChange,
  colorSuggestions = [],
  fontSizeSuggestions = DEFAULT_FONT_SIZES,
  scrollableContainerRef,
}) => {
  const onSettingsChange = (name: keyof FontSettings, value: any) => {
    const newSettings = {
      ...settings,
      [name]: value,
    };
    onChange(newSettings);
  };

  return (
    <Container onMouseDown={(e) => e.preventDefault()}>
      <Color
        color={settings.color}
        colorSuggestions={colorSuggestions}
        scrollableContainerRef={scrollableContainerRef}
        onColorChange={(color: string) => onSettingsChange('color', color)}
      />
      <FontSize
        currentFontSize={settings.size}
        fontSizeSuggestions={fontSizeSuggestions}
        onUpdateFontSize={(size) => onSettingsChange('size', size)}
      />
      {FONT_STYLES.map(({ name, icon }) => (
        <TextOption
          key={name}
          isActive={settings[name]}
          onClick={() => {
            onSettingsChange(name, !settings[name]);
          }}
        >
          <Icon type={icon} width={15} height={15} fill={colors.black[100]} />
        </TextOption>
      ))}
      <Separator />
      <TextAlignment
        currentAlignment={settings.alignment}
        onUpdateTextAlignment={(alignment) =>
          onSettingsChange('alignment', alignment)
        }
      />
    </Container>
  );
};
export default TypographySettings;
