import { transformExtraction } from './extraction';

import { extractionResultFixture } from '../../api.fixtures';

test('creates object from flatten array', () => {
  const result = transformExtraction(extractionResultFixture.result);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "geo.city": "Krakow",
      "geo.coordinates.0": 19.9789,
      "geo.coordinates.1": 50.0591,
      "geo.country": "Poland",
      "geo.province": "Lesser Poland",
      "lastLoginDate": 1576851939,
      "tech.device.family": "other",
      "tech.device.type": "desktop",
      "userData.email": "John@Evans.com",
      "userData.firstName": "John",
      "userData.id": 1,
      "userData.lastName": "Evans",
    }
  `);
});
