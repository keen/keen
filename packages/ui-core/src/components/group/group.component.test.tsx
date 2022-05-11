import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';
import 'jest-styled-components';

import Group from './group.component';

const render = (props: Partial<ComponentProps<typeof Group>> = {}) => {
  const wrapper = rtlRender(
    <Group {...props}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </Group>
  );

  return {
    wrapper,
    props,
  };
};

test('should wrap groupped children', () => {
  const {
    wrapper: { container },
  } = render();

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class=""
      >
        <div>
          1
        </div>
        <div>
          2
        </div>
      </div>
      <div
        class=""
      >
        <div>
          3
        </div>
        <div>
          4
        </div>
      </div>
    </div>
  `);
});

test('should wrap children with provided node', () => {
  const CustomNode = ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  );

  const {
    wrapper: { container },
  } = render({ groupNode: CustomNode, chunks: 3 });

  expect(container).toMatchInlineSnapshot(`
    <div>
      <span>
        <div>
          1
        </div>
        <div>
          2
        </div>
        <div>
          3
        </div>
      </span>
      <span>
        <div>
          4
        </div>
      </span>
    </div>
  `);
});

test('should wrap groupped children based on chunks property', () => {
  const {
    wrapper: { container },
  } = render({ chunks: 3 });

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class=""
      >
        <div>
          1
        </div>
        <div>
          2
        </div>
        <div>
          3
        </div>
      </div>
      <div
        class=""
      >
        <div>
          4
        </div>
      </div>
    </div>
  `);
});
