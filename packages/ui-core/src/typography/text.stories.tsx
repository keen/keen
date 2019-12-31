import * as React from 'react';
import styled from 'styled-components';
import { withKnobs, select } from '@storybook/addon-knobs';
import { loremIpsum } from 'lorem-ipsum';
import { theme } from '../theme';
import Text from './text.component';
import { useFontLoader } from './text.utils';
import { createTypographyKnobs, getGoogleFonts } from '@keen/storybook-utils';

const Wrapper = styled.div`
  width: 100%;
`;

export default {
  title: 'UI Core / Typhography',
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
    theme.textOption,
    theme.textOption[0]
  ) as any;
  const typographyKnobs = createTypographyKnobs('typography', fonts);

  useFontLoader(typographyKnobs.fontFamily);

  return (
    <Wrapper>
      <Text {...typographyKnobs} {...predefinedOptions}>
        {loremIpsum()}
      </Text>
    </Wrapper>
  );
};

TextKnobs.story = {
  name: 'Text',
};
