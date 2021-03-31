export type Options = {
  timezones: { name: string; utcOffset: string }[];
  timezone?: string;
  onChange: (timezone: string) => void;
};

export type DropdownPosition = 'top' | 'bottom';
