import { createLegendLabels } from './bubble-chart.widget.utils';

describe('createLegendLabels()', () => {
  const data = [
    {
      channel: 'Facebook',
      cost: 200,
      users: 100,
    },
    {
      channel: 'Google',
      cost: 400,
      users: 200,
    },
    {
      channel: 'Youtube',
      cost: 100,
      users: 100,
    },
    {
      channel: 'Facebook',
      cost: 400,
      users: 200,
    },
  ];
  const labelSelector = 'channel';
  it('should return unique label array', () => {
    const result = createLegendLabels(data, labelSelector);

    expect(result).toMatchInlineSnapshot(`
      Array [
        "Facebook",
        "Google",
        "Youtube",
      ]
    `);
  });
});
