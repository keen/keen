import { ExtendedFeatureCollection } from 'd3-geo';
import detectGeographicMatch, {
  GeoAreaMatchStatus,
} from './detect-geographic-match';

import { topology, usTopology } from '../choropleth-chart.fixtures';

test('returns "MATCHED" status for at least one succesfully matched geographic area', () => {
  const status = detectGeographicMatch(topology as ExtendedFeatureCollection, [
    'PL',
    'DE',
  ]);

  expect(status).toEqual(GeoAreaMatchStatus.MATCHED);
});

test('returns "MATCHED" status for empty geographic area keys', () => {
  const status = detectGeographicMatch(
    topology as ExtendedFeatureCollection,
    []
  );

  expect(status).toEqual(GeoAreaMatchStatus.MATCHED);
});

test('returns "NOT_MATCHED" status for not matching at least once geographic area', () => {
  const status = detectGeographicMatch(topology as ExtendedFeatureCollection, [
    'UK',
    'DE',
  ]);

  expect(status).toEqual(GeoAreaMatchStatus.NOT_MATCHED);
});

test('returns "MATCHED" status for matched state abbreviation', () => {
  const status = detectGeographicMatch(
    usTopology as ExtendedFeatureCollection,
    ['AZ']
  );
  expect(status).toEqual(GeoAreaMatchStatus.MATCHED);
});
