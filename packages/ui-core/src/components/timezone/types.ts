export type Timezone = {
  name: string;
  utcOffset: string;
};

export type DropdownPosition = 'top' | 'bottom';

export type Options = {
  timezones: Timezone[];
  timezone?: Timezone;
  onChange: (timezone: Timezone) => void;
};
