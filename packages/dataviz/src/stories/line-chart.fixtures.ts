export const query = {
  query: {
    analysis_type: 'count',
    event_collection: 'book_purchases',
    group_by: ['name'],
    timeframe: {
      start: '2020-01-01T00:00:00.000-00:00',
      end: '2020-02-01T16:00:00.000-00:00',
    },
    interval: 'weekly',
  },
  result: [
    {
      timeframe: {
        start: '2020-01-01T00:00:00.000Z',
        end: '2020-01-05T00:00:00.000Z',
      },
      value: [
        {
          name: 'Da Vinci Code,The',
          result: 3,
        },
        {
          name: 'Harry Potter and the Deathly Hallows	',
          result: 52,
        },
        {
          name: 'Fifty Shades of Grey',
          result: 12,
        },
        {
          name: 'Angels and Demons',
          result: 24,
        },
        {
          name: 'Harry Potter and the Half-blood Prince:Childrens Edition',
          result: 33,
        },
        {
          name: 'Twilight',
          result: 12,
        },
        {
          name: 'Girl with the Dragon Tattoo,The:Millennium Trilogy',
          result: 43,
        },
        {
          name: 'Lost Symbol,The',
          result: 32,
        },
        {
          name: 'New Moon',
          result: 24,
        },
        {
          name: 'Deception Point',
          result: 4,
        },
        {
          name: 'Eclipse',
          result: 1,
        },
        {
          name: 'Lovely Bones,The',
          result: 31,
        },
        {
          name: 'Curious Incident of the Dog in the Night-time,The',
          result: 12,
        },
        {
          name: 'Digital Fortress',
          result: 56,
        },
        {
          name: 'Very Hungry Caterpillar,The:The Very Hungry Caterpillar',
          result: 1,
        },
        {
          name: 'Gruffalo,The',
          result: 32,
        },
        {
          name: 'One Day',
          result: 5,
        },
      ],
    },
    {
      timeframe: {
        start: '2020-01-05T00:00:00.000Z',
        end: '2020-01-12T00:00:00.000Z',
      },
      value: [
        {
          name: 'Da Vinci Code,The',
          result: 6,
        },
        {
          name: 'Harry Potter and the Deathly Hallows	',
          result: 43,
        },
        {
          name: 'Fifty Shades of Grey',
          result: 15,
        },
        {
          name: 'Angels and Demons',
          result: 32,
        },
        {
          name: 'Harry Potter and the Half-blood Prince:Childrens Edition',
          result: 12,
        },
        {
          name: 'Twilight',
          result: 43,
        },
        {
          name: 'Girl with the Dragon Tattoo,The:Millennium Trilogy',
          result: 3,
        },
        {
          name: 'Lost Symbol,The',
          result: 11,
        },
        {
          name: 'New Moon',
          result: 45,
        },
        {
          name: 'Deception Point',
          result: 10,
        },
        {
          name: 'Eclipse',
          result: 12,
        },
        {
          name: 'Lovely Bones,The',
          result: 23,
        },
        {
          name: 'Curious Incident of the Dog in the Night-time,The',
          result: 43,
        },
        {
          name: 'Digital Fortress',
          result: 12,
        },
        {
          name: 'Very Hungry Caterpillar,The:The Very Hungry Caterpillar',
          result: 4,
        },
        {
          name: 'Gruffalo,The',
          result: 7,
        },
        {
          name: 'One Day',
          result: 5,
        },
      ],
    },
    {
      timeframe: {
        start: '2020-01-12T00:00:00.000Z',
        end: '2020-01-19T00:00:00.000Z',
      },
      value: [
        {
          name: 'Da Vinci Code,The',
          result: 43,
        },
        {
          name: 'Harry Potter and the Deathly Hallows	',
          result: 12,
        },
        {
          name: 'Fifty Shades of Grey',
          result: 21,
        },
        {
          name: 'Angels and Demons',
          result: 45,
        },
        {
          name: 'Harry Potter and the Half-blood Prince:Childrens Edition',
          result: 41,
        },
        {
          name: 'Twilight',
          result: 23,
        },
        {
          name: 'Girl with the Dragon Tattoo,The:Millennium Trilogy',
          result: 42,
        },
        {
          name: 'Lost Symbol,The',
          result: 12,
        },
        {
          name: 'New Moon',
          result: 25,
        },
        {
          name: 'Deception Point',
          result: 1,
        },
        {
          name: 'Eclipse',
          result: 11,
        },
        {
          name: 'Lovely Bones,The',
          result: 24,
        },
        {
          name: 'Curious Incident of the Dog in the Night-time,The',
          result: 15,
        },
        {
          name: 'Digital Fortress',
          result: 34,
        },
        {
          name: 'Very Hungry Caterpillar,The:The Very Hungry Caterpillar',
          result: 12,
        },
        {
          name: 'Gruffalo,The',
          result: 15,
        },
        {
          name: 'One Day',
          result: 4,
        },
      ],
    },
    {
      timeframe: {
        start: '2020-01-19T00:00:00.000Z',
        end: '2020-01-26T00:00:00.000Z',
      },
      value: [
        {
          name: 'Da Vinci Code,The',
          result: 15,
        },
        {
          name: 'Harry Potter and the Deathly Hallows	',
          result: 24,
        },
        {
          name: 'Fifty Shades of Grey',
          result: 41,
        },
        {
          name: 'Angels and Demons',
          result: 52,
        },
        {
          name: 'Harry Potter and the Half-blood Prince:Childrens Edition',
          result: 12,
        },
        {
          name: 'Twilight',
          result: 32,
        },
        {
          name: 'Girl with the Dragon Tattoo,The:Millennium Trilogy',
          result: 41,
        },
        {
          name: 'Lost Symbol,The',
          result: 1,
        },
        {
          name: 'New Moon',
          result: 5,
        },
        {
          name: 'Deception Point',
          result: 12,
        },
        {
          name: 'Eclipse',
          result: 26,
        },
        {
          name: 'Lovely Bones,The',
          result: 19,
        },
        {
          name: 'Curious Incident of the Dog in the Night-time,The',
          result: 6,
        },
        {
          name: 'Digital Fortress',
          result: 9,
        },
        {
          name: 'Very Hungry Caterpillar,The:The Very Hungry Caterpillar',
          result: 25,
        },
        {
          name: 'Gruffalo,The',
          result: 26,
        },
        {
          name: 'One Day',
          result: 16,
        },
      ],
    },
  ],
};
