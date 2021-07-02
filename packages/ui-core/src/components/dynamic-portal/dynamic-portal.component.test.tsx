import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { DynamicPortal } from '../index';

test('Renders portal inside document body', async () => {
  const { getByTestId } = render(<DynamicPortal>Content</DynamicPortal>);
  await waitFor(() => {
    expect(getByTestId('dynamic-portal')).toBeInTheDocument();
  });
});

test('Removes portal from document body on unmount', async () => {
  const { queryByTestId, unmount } = render(
    <DynamicPortal>Content</DynamicPortal>
  );
  unmount();
  await waitFor(() => {
    expect(queryByTestId('dynamic-portal')).not.toBeInTheDocument();
  });
});
