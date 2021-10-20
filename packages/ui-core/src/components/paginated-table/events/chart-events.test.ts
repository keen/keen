import ChartEvents from './chart-events';

test('allows to publish event with metadata', () => {
  const pubsub = {
    publish: jest.fn(),
    subscribe: jest.fn(),
    subscriptions: [],
  };

  const chartEvents = new ChartEvents({ pubsub });
  chartEvents.publish({ eventName: '@event-name', meta: { id: '@id' } });

  expect(pubsub.publish).toHaveBeenCalledWith('@event-name', { id: '@id' });
});

test('allows subscribe to events', () => {
  const pubsub = {
    publish: jest.fn(),
    subscribe: jest.fn(),
    subscriptions: [],
  };

  const chartEvents = new ChartEvents({ pubsub });
  const callback = jest.fn();

  chartEvents.subscribe(callback);

  expect(pubsub.subscribe).toHaveBeenCalled();
});
