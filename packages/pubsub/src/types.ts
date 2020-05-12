export type CallbackFn = (event: any, meta?: Record<string, any>) => void;

export type Subscription = {
  id: number;
  callback: CallbackFn;
};
