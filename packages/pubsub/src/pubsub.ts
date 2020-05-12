import { Subscription, CallbackFn } from './types';

class PubSub {
  subscriptions: Subscription[] = [];

  subscribe(callback: CallbackFn) {
    const subscriptionId = this.subscriptions.length++;
    this.subscriptions.push({
      id: subscriptionId,
      callback,
    });

    return () => {
      this.subscriptions = this.subscriptions.filter(
        ({ id }) => id !== subscriptionId
      );
    };
  }

  publish(eventName: string, meta: Record<string, any> = {}) {
    this.subscriptions.forEach(({ callback }) => callback(eventName, meta));
  }
}

export default PubSub;
