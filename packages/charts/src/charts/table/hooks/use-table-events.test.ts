import { renderHook, act } from '@testing-library/react-hooks';
import { PubSub } from '@keen.io/pubsub';

import { useTableEvents } from './use-table-events';
import { ChartEvents } from '../../../events';

import { TableEvents } from '../types';

test('publishes column selection event', () => {
  const pubsub = {
    publish: jest.fn(),
    subscribe: jest.fn(),
    subscriptions: [],
  };

  const chartEvents = new ChartEvents<TableEvents>({ pubsub });
  const { result } = renderHook(() =>
    useTableEvents({ chartEvents, onDeselectColumns: jest.fn() })
  );

  const data = [{ platform: 'MacOS' }, { platform: 'Windows' }];

  act(() => {
    result.current.publishColumnSelection(data, {}, [
      { columnName: 'platform', index: 0 },
    ]);
  });

  expect(pubsub.publish).toHaveBeenCalledWith('@table/columns-selected', {
    selection: [
      {
        name: 'platform',
        formatter: null,
        dataType: 'string',
      },
    ],
  });
});

test('calls "onDeselectColumns" handler', () => {
  const pubsub = new PubSub();
  const mockFn = jest.fn();

  const chartEvents = new ChartEvents<TableEvents>({ pubsub });
  renderHook(() => useTableEvents({ chartEvents, onDeselectColumns: mockFn }));

  act(() => {
    chartEvents.publish({ eventName: '@table/deselect-columns' });
  });

  expect(mockFn).toHaveBeenCalled();
});
