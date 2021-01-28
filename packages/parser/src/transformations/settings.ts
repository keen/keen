import { transformFunnel } from './funnel';
import { transformSingular } from './singular';
import { transformExtraction } from './extraction';
import { transformNominal } from './nominal';
import { transformChronologicalNominal } from './chronological-nominal';
import { transformChronological } from './chronological';
import { transformCategorical } from './categorical';
import { transformCategoricalNominal } from './categorical-nominal';
import { transformCategoricalChronological } from './categorical-chronological';
import { transformChronologicalCategoricalNominal } from './chronological-categorical-nominal';

import { Transformation, TransformationFunction } from '../types';

export const TRANSFORMATIONS: Record<Transformation, TransformationFunction> = {
  funnel: transformFunnel,
  extraction: transformExtraction,
  categorical: transformCategorical,
  chronological: transformChronological,
  singular: transformSingular,
  nominal: transformNominal,
  'categorical-chronological': transformCategoricalChronological,
  'categorical-nominal': transformCategoricalNominal,
  'chronological-nominal': transformChronologicalNominal,
  'chronological-categorical-nominal': transformChronologicalCategoricalNominal,
};
