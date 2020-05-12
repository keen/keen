import PubSub from './pubsub';

describe('@keen.io/pubsub', () => {
  const eventPayload = { country: 'USA' };
  let pubsub: PubSub;

  beforeEach(() => {
    pubsub = new PubSub();
  });

  it('should call "callback" handler for subscription', () => {
    const mockFn = jest.fn();

    pubsub.subscribe(mockFn);
    pubsub.publish('login', eventPayload);

    expect(mockFn).toHaveBeenCalledWith('login', eventPayload);
  });

  it('should not call "calback" handler after applying "dispose" function', () => {
    const mockFn = jest.fn();
    const subscription = pubsub.subscribe(mockFn);

    subscription();
    pubsub.publish('login', eventPayload);

    expect(mockFn).not.toHaveBeenCalled();
  });
});
