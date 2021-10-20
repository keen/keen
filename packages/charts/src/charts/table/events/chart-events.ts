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

  publish({ eventName, meta }: E) {
    this.pubsub.publish(eventName, meta);
  }

  subscribe(callback: (events: E) => void) {
    return this.pubsub.subscribe((eventName: string, meta = {}) =>
      callback({ eventName, meta } as E)
    );
  }
}

export default ChartEvents;
