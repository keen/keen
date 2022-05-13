import * as React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { loremIpsum } from 'lorem-ipsum';
import { typographyKnobs, getGoogleFonts } from '@keen.io/storybook-utils';

import Text from './text.component';
import { useFontLoader } from './text.utils';

import { textVariants, theme } from '../theme';

export default {
  title: 'Components / Typography',
  decorators: [withKnobs],
};

export const TextKnobs = () => {
  const [fonts, setFonts] = React.useState([]);
  React.useEffect(() => {
    getGoogleFonts().then((googleFonts: React.SetStateAction<string[]>) =>
      setFonts(googleFonts)
    );
  }, []);

  const predefinedOptions = select(
    'Predefined options',
    textVariants,
    textVariants[0]
  ) as any;

  const knobs = typographyKnobs('typography', {}, [], fonts);

  useFontLoader([knobs.fontFamily]);

  return (
    <Text {...knobs} {...predefinedOptions}>
      {loremIpsum()}
    </Text>
  );
};

TextKnobs.story = {
  name: 'Text',
};

const themeFonts = [
  'Oswald',
  'Roboto',
  'Raleway',
  'Rubik',
  'Lora',
  'Quicksand',
  'Inter',
  'Karla',
  'Josefin Sans',
  'Dosis',
  'Orbitron',
  'Alegreya',
  'Lemonada',
  'Podkova',
  'Imbue',
  'Grandstander',
  'Fira Code',
  'Kufam',
  'Varta',
];

const defaultFonts = [theme.font.GangsterGrotesk, theme.font.Lato];

const availableFonts = [...defaultFonts, ...themeFonts];

export const ThemeableText = () => {
  const headerFont = select('Title', availableFonts, availableFonts[0]);
  const contentFont = select('Content', availableFonts, availableFonts[0]);

  return (
    <>
      <Text
        htmlElement="h1"
        fontStyle="normal"
        fontWeight="normal"
        fontSize={24}
        fontColor="black"
        fontFamily={headerFont}
      >
        Custom title
      </Text>
      <Text
        htmlElement="p"
        fontStyle="normal"
        fontWeight="normal"
        fontSize={16}
        fontColor="black"
        fontFamily={contentFont}
      >
        {loremIpsum()}
      </Text>
    </>
  );
};
