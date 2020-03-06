import React from 'react';
import { mount } from 'enzyme';

import FunnelHeader from './funnel-header.component';

import { theme } from '../../theme';

const setup = (overProps: any = {}) => {
  const props = {
    theme,
    percentageValue: 50,
    value: 1000,
    label: 'Logins',
    ...overProps,
  };

  const wrapper = mount(<FunnelHeader {...props} />);

  return {
    props,
    findValue: () => wrapper.find('[data-test="step-value"]'),
    findBadge: () => wrapper.find('[data-test="step-badge"]'),
    findBadgeText: () => wrapper.find('[data-test="badge-text"]'),
    findStepLabel: () => wrapper.find('[data-test="step-label"]'),
  };
};

describe('@keen.io/charts - <FunnelHeader />', () => {
  it('should render "value" element', () => {
    const { findValue } = setup();

    expect(findValue().length).toBeTruthy();
  });

  it('should apply "typography" theme for value text', () => {
    const { props, findValue } = setup();
    const element = findValue();

    expect(element.first().props()).toMatchObject(
      props.theme.funnel.header.value.typography
    );
  });

  it('should not render "value" element', () => {
    const { findValue } = setup({
      theme: {
        ...theme,
        funnel: {
          ...theme.funnel,
          header: {
            ...theme.funnel.header,
            value: {
              ...theme.funnel.header.value,
              enabled: false,
            },
          },
        },
      },
    });

    expect(findValue().length).toBeFalsy();
  });

  it('should render "label" element', () => {
    const { findStepLabel } = setup();

    expect(findStepLabel().length).toBeTruthy();
  });

  it('should apply "typography" theme for label text', () => {
    const { props, findStepLabel } = setup();
    const element = findStepLabel();

    expect(element.first().props()).toMatchObject(
      props.theme.funnel.header.title.typography
    );
  });

  it('should render "badge" element with percentage value', () => {
    const { props, findBadge } = setup();
    const element = findBadge();

    expect(findBadge().length).toBeTruthy();
    expect(element.text()).toEqual(`${props.percentageValue}%`);
  });

  it('should apply "typography" theme for badge text', () => {
    const { props, findBadgeText } = setup();
    const element = findBadgeText();

    expect(element.first().props()).toMatchObject(
      props.theme.funnel.header.badge.typography
    );
  });

  it('should not render "badge" element', () => {
    const { findBadge } = setup({
      theme: {
        ...theme,
        funnel: {
          ...theme.funnel,
          header: {
            ...theme.funnel.header,
            badge: {
              ...theme.funnel.header.badge,
              enabled: false,
            },
          },
        },
      },
    });

    expect(findBadge().length).toBeFalsy();
  });
});
