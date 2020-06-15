export const chartData = [
  { channel: 'Facebook', cost: 310, conversion: 352, users: 500 },
  { channel: 'Facebook', cost: 200, conversion: 110, users: 130 },
  { channel: 'Linkedin', cost: 210, conversion: 82, users: 100 },
  { channel: 'Google', cost: 350, conversion: 125, users: 120 },
  { channel: 'Google', cost: 120, conversion: 78, users: 210 },
  { channel: 'Google', cost: 150, conversion: 23, users: 104 },
  { channel: 'Youtube', cost: 150, conversion: 320, users: 320 },
  { channel: 'Google', cost: 240, conversion: 200, users: 300 },
  { channel: 'Youtube', cost: 120, conversion: 45, users: 210 },
  { channel: 'Youtube', cost: 160, conversion: 49, users: 190 },
  { channel: 'Linkedin', cost: 210, conversion: 52, users: 195 },
];

export const chartFixture = {
  data: [
    { channel: 'Facebook', cost: 310, conversion: 352, users: 500 },
    { channel: 'Linkedin', cost: 210, conversion: 82, users: 100 },
    { channel: 'Google', cost: 350, conversion: 125, users: 120 },
    { channel: 'Youtube', cost: 150, conversion: 320, users: 320 },
  ],
  colors: ['blue', 'yellow', 'green', 'orange', 'red'],
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  dimension: { width: 100, height: 100 },
  minAreaRadius: 5,
  maxAreaRadius: 40,
  valueKey: 'cost',
  labelSelector: 'channel',
  xDomainKey: 'conversion',
  yDomainKey: 'users',
  disabledKeys: [] as string[],
};
