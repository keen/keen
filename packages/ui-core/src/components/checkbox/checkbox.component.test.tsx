import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import Checkbox from './checkbox.component';

describe('@keen.io/ui-core - <Checkbox />', () => {
  it('should call "onChange" handler', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Checkbox id="id" checked={true} onChange={mockFn} />
    );

    wrapper
      .find('input[type="checkbox"]')
      .first()
      .simulate('change', {
        target: { checked: true },
      });

    expect(mockFn).toHaveBeenCalled();
  });

  it('should set checkbox element "checked" to truthy value', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Checkbox id="id" checked={true} onChange={mockFn} />
    );

    expect(wrapper.find('input[type="checkbox"]').props().checked).toBeTruthy();
  });

  it('should set checkbox element "checked" to false value', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Checkbox id="id" checked={false} onChange={mockFn} />
    );

    expect(wrapper.find('input[type="checkbox"]').props().checked).toBeFalsy();
  });

  it('should set checkbox element "disabled" to truthy value', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Checkbox id="id" disabled={true} onChange={mockFn} />
    );

    expect(
      wrapper.find('input[type="checkbox"]').props().disabled
    ).toBeTruthy();
  });

  it('should set checkbox element "disabled" to false value', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Checkbox id="id" disabled={false} onChange={mockFn} />
    );

    expect(wrapper.find('input[type="checkbox"]').props().disabled).toBeFalsy();
  });

  it('should set primary checkbox style', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Checkbox id="id" onChange={mockFn} />);

    expect(wrapper).toMatchInlineSnapshot(`
      .c0 {
        display: inline-block;
        vertical-align: middle;
      }

      .c2 {
        position: relative;
        display: inline-block;
        border: solid 1px #27566D;
        border-radius: 2px;
        width: 12px;
        height: 12px;
      }

      .c1 {
        border: 0;
        -webkit-clip: rect(0 0 0 0);
        clip: rect(0 0 0 0);
        -webkit-clippath: inset(50%);
        clippath: inset(50%);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        white-space: nowrap;
        width: 1px;
      }

      <Component
        id="id"
        onChange={[MockFunction]}
      >
        <styled.div>
          <div
            className="c0"
          >
            <styled.input
              checked={false}
              disabled={false}
              id="id"
              onChange={[Function]}
            >
              <input
                checked={false}
                className="c1"
                disabled={false}
                id="id"
                onChange={[Function]}
                type="checkbox"
              />
            </styled.input>
            <styled.div
              checked={false}
              type="primary"
            >
              <div
                checked={false}
                className="c2"
                type="primary"
              >
                <AnimatePresence />
              </div>
            </styled.div>
          </div>
        </styled.div>
      </Component>
    `);
  });

  it('should set secondary checkbox style', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Checkbox id="id" type="secondary" onChange={mockFn} />
    );

    expect(wrapper).toMatchInlineSnapshot(`
      .c0 {
        display: inline-block;
        vertical-align: middle;
      }

      .c2 {
        position: relative;
        display: inline-block;
        border: solid 1px rgba(39,86,109,0.2);
        background: rgba(119,163,187,0.05);
        border-radius: 4px;
        width: 15px;
        height: 15px;
      }

      .c1 {
        border: 0;
        -webkit-clip: rect(0 0 0 0);
        clip: rect(0 0 0 0);
        -webkit-clippath: inset(50%);
        clippath: inset(50%);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        white-space: nowrap;
        width: 1px;
      }

      <Component
        id="id"
        onChange={[MockFunction]}
        type="secondary"
      >
        <styled.div>
          <div
            className="c0"
          >
            <styled.input
              checked={false}
              disabled={false}
              id="id"
              onChange={[Function]}
            >
              <input
                checked={false}
                className="c1"
                disabled={false}
                id="id"
                onChange={[Function]}
                type="checkbox"
              />
            </styled.input>
            <styled.div
              checked={false}
              type="secondary"
            >
              <div
                checked={false}
                className="c2"
                type="secondary"
              >
                <AnimatePresence />
              </div>
            </styled.div>
          </div>
        </styled.div>
      </Component>
    `);
  });
});
