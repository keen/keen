import { PubSub } from '@keen.io/pubsub';

type Options = {
  pubsub: PubSub;
};

class ChartEvents<E extends { eventName: string; meta?: Record<string, any> }> {
  /* Event bus instance */
  private pubsub: PubSub;

  constructor({ pubsub }: Options) {
    this.pubsub = pubsub;
  }

  subscribe(callback: (events: E) => void) {
    return this.pubsub.subscribe((eventName: string, meta = {}) =>
      callback({ eventName, meta } as E)
    );
  }
}

export default ChartEvents;
