import { fetchMapTopology, MapType } from './map.utils';
import { generateChoropleth, GeoProperty } from './chart.utils';
import detectGeographicMatch, {
  GeoAreaMatchStatus,
} from './detect-geographic-match';

export type { GeoProperty, MapType };

export {
  fetchMapTopology,
  GeoAreaMatchStatus,
  generateChoropleth,
  detectGeographicMatch,
};
