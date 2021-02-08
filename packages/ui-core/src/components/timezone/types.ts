import { Timezones } from '@keen.io/query';

export type Timezone = {
  name: Timezones;
  value: number;
  dstValue: number;
};
