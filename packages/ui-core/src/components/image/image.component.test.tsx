import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';
import 'jest-styled-components';

import Image from './image.component';

const render = (overProps: Partial<ComponentProps<typeof Image>> = {}) => {
  const props = {
    name: 'test',
    ...overProps,
  };

  const wrapper = rtlRender(<Image {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should render image', () => {
  const {
    wrapper: { container },
  } = render();

  expect(container).toMatchInlineSnapshot(`
    <div>
      <img
        src="/test"
      />
    </div>
  `);
});

test('should render image from provided src', () => {
  const src = 'http://image.com';
  const {
    wrapper: { container },
  } = render({ src });
  const img = container.querySelector('img');
  const imgSrc = img.getAttribute('src');

  expect(imgSrc).toEqual(src);
});

test('should render loader once image is not loaded yet', () => {
  const src = 'http://image.com';
  const {
    wrapper: { container },
  } = render({ src, useLoader: true });
  expect(container.querySelector('svg')).toBeInTheDocument();
});
