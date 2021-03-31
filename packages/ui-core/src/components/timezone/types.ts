export type Options = {
  timezones: { name: string; utcOffset: string }[];
  timezone?: { name: string; utcOffset?: string };
  onChange: (timezone: string) => void;
};

export type DropdownPosition = 'top' | 'bottom';
