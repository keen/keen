import React from 'react';
import { mount } from 'enzyme';

import PciField from './pci-field.component';

describe('@keen.io/forms - <PciField />', () => {
  const id = 'card-number';
  it('should render element with "id" attribute', () => {
    const wrapper = mount(<PciField label="Card number" id={id} />);

    expect(wrapper.exists(`#${id}`)).toBeTruthy();
  });

  it('should render <Error /> component', () => {
    const error = 'Invalid card number';
    const wrapper = mount(
      <PciField error={error} id={id} label="Card number" />
    );

    expect(wrapper.find('[data-error="card-number"]').first().text()).toEqual(
      error
    );
  });
});
