import { extractEvent } from './extract-event';

test('creates flat structure from event', () => {
  const event = {
    userData: {
      firstName: 'John',
      lastName: 'Evans',
    },
    geo: {
      city: 'Krakow',
      country: 'Poland',
      coordinates: [19.9789, 50.0591],
    },
  };

  expect(extractEvent(event)).toMatchInlineSnapshot(`
    Object {
      "geo.city": "Krakow",
      "geo.coordinates.0": 19.9789,
      "geo.coordinates.1": 50.0591,
      "geo.country": "Poland",
      "userData.firstName": "John",
      "userData.lastName": "Evans",
    }
  `);
});
