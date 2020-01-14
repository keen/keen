import React from 'react';
import { render } from 'enzyme';
import 'jest-styled-components';

import Group from './group.component';

describe('@keen.io/charts - <Group />', () => {
  it('should wrap groupped children', () => {
    const wrapper = render(
      <Group>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Group>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should wrap children with provided node', () => {
    const CustomNode = ({ children }: { children: React.ReactNode }) => (
      <span>{children}</span>
    );

    const wrapper = render(
      <Group groupNode={CustomNode} chunks={3}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Group>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should wrap groupped children based on chunks property', () => {
    const wrapper = render(
      <Group chunks={3}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Group>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
