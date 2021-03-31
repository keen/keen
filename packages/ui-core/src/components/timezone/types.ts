export type Timezone = {
  name: string;
  utcOffset?: string;
};

export type Options = {
  timezones: Timezone[];
  timezone?: Timezone;
  onChange: (timezone: string) => void;
};

export type DropdownPosition = 'top' | 'bottom';
