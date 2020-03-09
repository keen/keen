import { select, boolean } from '@storybook/addon-knobs';

import { typographyKnobs } from './typography.knobs';
import { layoutKnobs } from './select.knobs';
import { cardKnobs } from './card.knobs';

const alignmentOptions = {
  left: 'left',
  center: 'center',
  right: 'right',
};

const positionOptions = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
};

export const legendKnobs = (namespace: string) => ({
  enabled: boolean('Enabled', true, namespace),
  position: select(
    'Position',
    positionOptions,
    positionOptions.top,
    namespace
  ) as any,
  alignment: select(
    'Alignment',
    alignmentOptions,
    alignmentOptions.left,
    namespace
  ),
  layout: layoutKnobs(namespace, 'horizontal'),
  typography: typographyKnobs(namespace, { fontSize: 10 }),
  card: cardKnobs(namespace),
});
