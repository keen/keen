/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

import Select from './select.component';

export default {
  title: 'Components / Forms / Select',
  parameters: {
    component: Select,
    componentSubtitle: 'Simple select component',
  },
};

const countries = [
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'Great Britain' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'ES', label: 'Spain' },
  { value: 'PL', label: 'Poland' },
];

export const basic = () => {
  const [country, setCountry] = React.useState(null);

  return (
    <div style={{ width: '250px' }}>
      <Select
        placeholder="Search or select country"
        value={country}
        onChange={(value) => setCountry(value)}
        options={countries}
      />
    </div>
  );
};

export const error = () => (
  <div style={{ width: '250px' }}>
    <Select
      hasError
      placeholder="Search or select country"
      value={null}
      onChange={(value, meta) => console.log({ value, meta })}
      options={[]}
    />
  </div>
);

export const basicSolid = () => {
  const [country, setCountry] = React.useState(null);

  return (
    <div style={{ width: '250px' }}>
      <Select
        placeholder="Search or select country"
        value={country}
        variant="solid"
        onChange={(value) => setCountry(value)}
        options={countries}
      />
    </div>
  );
};

export const errorSolid = () => (
  <div style={{ width: '250px' }}>
    <Select
      hasError
      placeholder="Search or select country"
      value={null}
      variant="solid"
      onChange={(value, meta) => console.log({ value, meta })}
      options={[]}
    />
  </div>
);

error.story = {
  parameters: {
    docs: {
      storyDescription: 'Select with error state.',
    },
  },
};
