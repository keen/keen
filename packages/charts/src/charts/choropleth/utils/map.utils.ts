import { ExtendedFeatureCollection } from 'd3-geo';
import { json } from 'd3-fetch';

export type MapType = 'world' | 'us';

const baseUrl = 'https://cdn.jsdelivr.net/npm/keen-dataviz-maps@latest/maps';

export const fetchMapTopology = (
  map: MapType
): Promise<ExtendedFeatureCollection> => json(`${baseUrl}/${map}.json`);
