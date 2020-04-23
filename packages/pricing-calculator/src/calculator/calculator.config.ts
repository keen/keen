export const eventsSettings = {
  intervals: [
    { minimum: 0, maximum: 50000, step: 1000 },
    { minimum: 50000, maximum: 100000, step: 1000 },
    { minimum: 100000, maximum: 250000, step: 1000 },
    { minimum: 250000, maximum: 500000, step: 1000 },
    { minimum: 500000, maximum: 1000000, step: 1000 },
    { minimum: 1000000, maximum: 5000000, step: 10000 },
    { minimum: 5000000, maximum: 10000000, step: 10000 },
    { minimum: 10000000, maximum: 20000000, step: 10000 },
  ],
  mappings: {
    50000: '50k',
    100000: '100k',
    250000: '250k',
    500000: '500k',
    1000000: '1M',
    5000000: '5M',
    10000000: '10M',
    20000000: '∞',
  } as Record<number, string>,
  highlightLabels: ['50k', '250k', '5M'],
};

const mapEventsValue = (value: number) =>
  eventsSettings.mappings[value] || value;

export const eventsRulerSettings = [
  {
    label: '0',
    position: '0%',
  },
  ...eventsSettings.intervals.map(({ maximum }, idx) => ({
    position: `${(100 / eventsSettings.intervals.length) * (idx + 1)}%`,
    label: mapEventsValue(maximum),
  })),
];

export const queriesSettings = {
  intervals: [
    { minimum: 0, maximum: 100, step: 1 },
    { minimum: 100, maximum: 500, step: 1 },
    { minimum: 500, maximum: 1000, step: 1 },
    { minimum: 1000, maximum: 5000, step: 100 },
    { minimum: 5000, maximum: 10000, step: 100 },
    { minimum: 10000, maximum: 25000, step: 100 },
    { minimum: 25000, maximum: 50000, step: 100 },
    { minimum: 50000, maximum: 100000, step: 1000 },
  ],
  mappings: {
    1000: '1k',
    5000: '5k',
    10000: '10k',
    25000: '25k',
    50000: '50k',
    100000: '∞',
  } as Record<number, string>,
  highlightLabels: ['500', '5k', '25k'],
};

const mapQueriesValue = (value: number) =>
  queriesSettings.mappings[value] || value;

export const queriesRulerSettings = [
  {
    label: '0',
    position: '0%',
  },
  ...queriesSettings.intervals.map(({ maximum }, idx) => ({
    position: `${(100 / queriesSettings.intervals.length) * (idx + 1)}%`,
    label: mapQueriesValue(maximum),
  })),
];

const addNumberSeparator = (num: number) => {
  const numParts = num.toString().split('.');
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return numParts.join('.');
};

export const getTooltipText = (value: number, max: number) =>
  value === max ? 'Unlimited' : addNumberSeparator(value);
