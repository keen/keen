type ReducerState = {
  events: number;
  queries: number;
  services: {
    s3Streaming: boolean;
    rbac: boolean;
    customSSL: boolean;
  };
};

const initialState: ReducerState = {
  events: 0,
  queries: 0,
  services: {
    s3Streaming: false,
    rbac: false,
    customSSL: false,
  },
};

export const calculatorReducer = (state: ReducerState = initialState) => state;
