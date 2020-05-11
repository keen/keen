import React from 'react';

import { IconProps } from '../types';

const MoneySolid = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <path
      fill={fill}
      d="M50 0c27.614 0 50 22.386 50 50s-22.386 50-50 50S0 77.614 0 50 22.386 0 50 0zm0 8.974C27.342 8.974 8.974 27.342 8.974 50c0 22.658 18.368 41.026 41.026 41.026 22.658 0 41.026-18.368 41.026-41.026C91.026 27.342 72.658 8.974 50 8.974zm2.564 10.898v6.78c2.033.12 4.032.461 5.997 1.022 2.518.72 4.716 1.72 6.588 3.006l1.166.801-3.005 5.805-1.485-.974a19.613 19.613 0 00-5.349-2.464c-1.909-.55-3.769-.824-5.584-.824-3.453 0-5.962.64-7.55 1.846l-.075.057-.08.047c-1.908 1.128-3.355 3.264-3.355 4.863 0 1.397.763 2.524 2.137 3.44a8.895 8.895 0 001.977 1.01l.319.116 1.513.521c1.342.457 3.083.955 5.218 1.492l1.206.299c3.02.754 5.492 1.502 7.42 2.25 2.186.847 4.05 2.138 5.574 3.861 1.632 1.845 2.432 4.295 2.432 7.276 0 2.475-.675 4.75-2.017 6.789-1.352 2.053-3.395 3.657-6.088 4.815-2.003.861-4.323 1.39-6.957 1.595l-.002 6.827h-5.128v-6.834a29.056 29.056 0 01-7.19-1.516c-3.158-1.099-5.64-2.574-7.43-4.447l-.862-.901 3.512-5.607 1.423 1.416c1.385 1.379 3.26 2.515 5.64 3.399a21.2 21.2 0 007.44 1.338c3.545 0 6.117-.626 7.73-1.803l.082-.06.27-.152c1.898-1.108 3.163-2.878 3.163-4.615 0-1.749-.406-2.474-1.642-3.519-.84-.711-2.35-1.476-3.998-2.074-1.452-.527-3.511-1.114-6.18-1.758-3.301-.832-5.946-1.636-7.945-2.42l-1.317-.51c-1.994-.793-3.13-1.47-4.25-2.737-1.654-1.866-2.464-4.347-2.464-7.368 0-2.47.662-4.742 1.98-6.779 1.326-2.051 3.334-3.666 5.982-4.848 1.759-.784 3.777-1.299 6.055-1.55v-6.911h5.13z"
    />
  </svg>
);

export default MoneySolid;
