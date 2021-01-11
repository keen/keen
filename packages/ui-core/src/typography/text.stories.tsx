import * as React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { loremIpsum } from 'lorem-ipsum';
import { typographyKnobs, getGoogleFonts } from '@keen.io/storybook-utils';

import Text from './text.component';
import { useFontLoader } from './text.utils';

import { textVariants } from '../theme';

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

  useFontLoader(knobs.fontFamily);

  return (
    <Text {...knobs} {...predefinedOptions}>
      {loremIpsum()}
    </Text>
  );
};

TextKnobs.story = {
  name: 'Text',
};
