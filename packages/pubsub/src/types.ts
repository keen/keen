export type CallbackFn = (event: string, meta?: Record<string, any>) => void;

export type Subscription = {
  id: number;
  callback: CallbackFn;
};
