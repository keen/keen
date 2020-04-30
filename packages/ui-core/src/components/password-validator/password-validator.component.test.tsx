import React from 'react';
import { mount } from 'enzyme';

import PasswordValidator from './password-validator.component';

import { passwordValidators } from './validators';

describe('@keen.io/ui-core - <PasswordValidator />', () => {
  it('should render validators', () => {
    const password = '';
    const wrapper = mount(
      <PasswordValidator password={password} touched={false} />
    );
    const validators = wrapper.find('li');

    expect(validators.length).toEqual(passwordValidators.length);
  });
});
