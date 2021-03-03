import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import 'jest-styled-components';

import Tooltip from './tooltip.component';
import BulletList from '../bullet-list';

const render = (overProps: any = {}) => {
  const props = {
    ...overProps,
  };

  const wrapper = rtlRender(<Tooltip {...props} />);
  return {
    wrapper,
    props,
  };
};

test('renders provided text', () => {
  const children = 'text';
  const {
    wrapper: { getByText },
  } = render({ children });

  expect(getByText(children)).toBeInTheDocument();
});

test('renders bullet points', () => {
  const bulletList = [
    {
      color: 'red',
      data: 'red',
    },
    {
      color: 'blue',
      data: 'blue',
    },
    {
      color: 'green',
      data: 'green',
    },
    {
      color: 'black',
      data: 'black',
    },
  ];

  const {
    wrapper: { getAllByRole },
  } = render({
    children: (
      <BulletList items={bulletList} renderItem={(idx, items) => items.data} />
    ),
  });

  expect(getAllByRole('listitem').length).toEqual(bulletList.length);
});

test('renders `dark-mode`', () => {
  const mode = 'dark';
  const children = 'tooltip';

  const {
    wrapper: { container },
  } = render({ mode, children });
  expect(container).toMatchInlineSnapshot(`
    .c0 {
      padding: 10px 15px;
      box-sizing: border-box;
      background-color: #FFFFFF;
      border-radius: 0px;
      font-family: 'Lato Regular',sans-serif;
      font-size: 14px;
      color: #3A494D;
      box-shadow: 0 10px 24px 0 rgba(29,39,41,0.15);
      position: relative;
      background-color: rgba(58,73,77,0.95);
      color: #FFFFFF;
    }

    .c0::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      box-sizing: border-box;
      border: 4px solid #FFFFFF;
      box-shadow: -3px 3px 24px 0 rgba(29,39,41,0.15);
      border-color: transparent transparent rgba(58,73,77,0.95) rgba(58,73,77,0.95);
      top: auto;
      bottom: 1px;
      left: 50%;
      right: auto;
      -webkit-transform: rotate(-45deg) translateX(-50%) translateX(-2px);
      -ms-transform: rotate(-45deg) translateX(-50%) translateX(-2px);
      transform: rotate(-45deg) translateX(-50%) translateX(-2px);
    }

    <div>
      <div
        class="c0"
        font-family="'Lato Regular',sans-serif"
        font-size="14"
        mode="dark"
      >
        tooltip
      </div>
    </div>
  `);
});

test('not renders box shadow', () => {
  const hasShadow = false;
  const children = 'tooltip';

  const {
    wrapper: { container },
  } = render({ hasShadow, children });
  expect(container).toMatchInlineSnapshot(`
    .c0 {
      padding: 10px 15px;
      box-sizing: border-box;
      background-color: #FFFFFF;
      border-radius: 0px;
      font-family: 'Lato Regular',sans-serif;
      font-size: 14px;
      color: #3A494D;
      box-shadow: none;
      position: relative;
      background-color: rgba(255,255,255,0.95);
      color: #3A494D;
    }

    .c0::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      box-sizing: border-box;
      border: 4px solid #FFFFFF;
      box-shadow: none;
      border-color: transparent transparent rgba(255,255,255,0.95) rgba(255,255,255,0.95);
      top: auto;
      bottom: 1px;
      left: 50%;
      right: auto;
      -webkit-transform: rotate(-45deg) translateX(-50%) translateX(-2px);
      -ms-transform: rotate(-45deg) translateX(-50%) translateX(-2px);
      transform: rotate(-45deg) translateX(-50%) translateX(-2px);
    }

    <div>
      <div
        class="c0"
        font-family="'Lato Regular',sans-serif"
        font-size="14"
        mode="light"
      >
        tooltip
      </div>
    </div>
  `);
});
