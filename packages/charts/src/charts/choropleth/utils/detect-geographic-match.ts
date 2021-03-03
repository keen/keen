import { ExtendedFeatureCollection } from 'd3-geo';

export enum GeoAreaMatchStatus {
  MATCHED = 'MATCHED',
  NOT_MATCHED = 'NOT_MATCHED',
}

/**
 * Detects map topology match with chart geaographic area keys.
 *
 * @param topology - map topology
 * @param geographicAreaKeys - collection of geo keys
 * @return match status
 *
 */
const detectGeographicMatch = (
  topology: ExtendedFeatureCollection,
  geographicAreaKeys: string[]
) => {
  const { features } = topology;
  let matchedGeographicalAreas = 0;

  features.forEach(({ properties: { name, iso_3166_2: iso3166 } }) => {
    if (
      geographicAreaKeys.includes(name) ||
      geographicAreaKeys.includes(iso3166)
    ) {
      matchedGeographicalAreas++;
    }
  });

  if (geographicAreaKeys.length > 0 && matchedGeographicalAreas === 0) {
    return GeoAreaMatchStatus.NOT_MATCHED;
  }

  return GeoAreaMatchStatus.MATCHED;
};

export default detectGeographicMatch;
