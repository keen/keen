import * as React from 'react';
import styled from 'styled-components';
import { withKnobs, select } from '@storybook/addon-knobs';
import { loremIpsum } from 'lorem-ipsum';
import { theme } from '../theme';
import Text from './text.component';
import { useFontLoader } from './text.utils';
import { typographyKnobs, getGoogleFonts } from '@keen.io/storybook-utils';
import { colors } from '@keen.io/colors';

const Wrapper = styled.div`
  width: 100%;
`;

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
    theme.textOption,
    theme.textOption[0]
  ) as any;

  const knobs = typographyKnobs('typography', {}, [], fonts);

  useFontLoader(knobs.fontFamily);

  return (
    <Wrapper>
      <Text {...knobs} {...predefinedOptions}>
        {loremIpsum()}
      </Text>
    </Wrapper>
  );
};

TextKnobs.story = {
  name: 'Text',
};

export const H1 = () => (
  <Wrapper>
    <Text
      fontStyle="normal"
      fontColor={colors.black['500']}
      {...theme.textOption.h1}
    >
      {loremIpsum()}
    </Text>
  </Wrapper>
);

H1.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `H1` text',
    },
  },
};

export const H2 = () => (
  <Wrapper>
    <Text
      fontStyle="normal"
      fontColor={colors.black['500']}
      {...theme.textOption.h2}
    >
      {loremIpsum()}
    </Text>
  </Wrapper>
);

H2.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `H2` text',
    },
  },
};

export const H3 = () => (
  <Wrapper>
    <Text
      fontStyle="normal"
      fontColor={colors.black['500']}
      {...theme.textOption.h3}
    >
      {loremIpsum()}
    </Text>
  </Wrapper>
);

H3.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `H3` text',
    },
  },
};

export const H4 = () => (
  <Wrapper>
    <Text
      fontStyle="normal"
      fontColor={colors.black['500']}
      {...theme.textOption.h4}
    >
      {loremIpsum()}
    </Text>
  </Wrapper>
);

H4.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `H4` text',
    },
  },
};

export const H5 = () => (
  <Wrapper>
    <Text
      fontStyle="normal"
      fontColor={colors.black['500']}
      {...theme.textOption.h5}
    >
      {loremIpsum()}
    </Text>
  </Wrapper>
);

H5.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `H5` text',
    },
  },
};

export const H6 = () => (
  <Wrapper>
    <Text
      fontStyle="normal"
      fontColor={colors.black['500']}
      {...theme.textOption.h6}
    >
      {loremIpsum()}
    </Text>
  </Wrapper>
);

H6.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `H6` text',
    },
  },
};

export const BodyBold = () => (
  <Wrapper>
    <Text
      fontStyle="normal"
      fontColor={colors.black['500']}
      {...theme.textOption['body-bold']}
    >
      {loremIpsum()}
    </Text>
  </Wrapper>
);

BodyBold.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `Body-Bold` text',
    },
  },
};

export const BodyNormal = () => (
  <Wrapper>
    <Text
      fontStyle="normal"
      fontColor={colors.black['500']}
      {...theme.textOption['body-normal']}
    >
      {loremIpsum()}
    </Text>
  </Wrapper>
);

BodyNormal.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `Body-Normal` text',
    },
  },
};

export const NumberXL = () => (
  <Wrapper>
    <Text
      fontStyle="normal"
      fontColor={colors.black['500']}
      {...theme.textOption['number-xl']}
    >
      {loremIpsum()}
    </Text>
  </Wrapper>
);

NumberXL.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `Number-XL` text',
    },
  },
};

export const NumberL = () => (
  <Wrapper>
    <Text
      fontStyle="normal"
      fontColor={colors.black['500']}
      {...theme.textOption['number-l']}
    >
      {loremIpsum()}
    </Text>
  </Wrapper>
);

NumberL.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `Number-L` text',
    },
  },
};

export const NumberM = () => (
  <Wrapper>
    <Text
      fontStyle="normal"
      fontColor={colors.black['500']}
      {...theme.textOption['number-m']}
    >
      {loremIpsum()}
    </Text>
  </Wrapper>
);

NumberM.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `Number-M` text',
    },
  },
};

export const NumberS = () => (
  <Wrapper>
    <Text
      fontStyle="normal"
      fontColor={colors.black['500']}
      {...theme.textOption['number-s']}
    >
      {loremIpsum()}
    </Text>
  </Wrapper>
);

NumberS.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `Number-S` text',
    },
  },
};
