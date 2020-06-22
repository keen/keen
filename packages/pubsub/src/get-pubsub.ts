import PubSub from './pubsub';

declare global {
  interface Window {
    KeenPubSub: PubSub;
  }
}

export const getPubSub = () => {
  if (typeof window === 'undefined') return new PubSub();
  if (!window.KeenPubSub) {
    const pubsub = new PubSub();
    window.KeenPubSub = pubsub;
  }
  return window.KeenPubSub;
};
