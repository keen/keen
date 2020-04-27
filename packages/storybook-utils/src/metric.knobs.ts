import { select, object, boolean } from '@storybook/addon-knobs';

import { iconKnobs } from './select.knobs';

export const metricIconKnobs = (namespace: string) => ({
  enabled: boolean('Enabled', true, namespace),
  style: select(
    'Style',
    { solid: 'solid', regular: 'regular' },
    'solid',
    namespace
  ),
  position: select(
    'Position',
    { top: 'top', center: 'center', bottom: 'bottom' },
    'top',
    namespace
  ),
  type: iconKnobs(namespace, 'brand'),
  margins: object(
    'Margins',
    { top: 0, right: 0, bottom: 0, left: 0 },
    namespace
  ),
});
