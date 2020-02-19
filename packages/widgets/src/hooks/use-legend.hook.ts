import { useState } from 'react';

export const useLegend = () => {
  const [keys, setKeys] = useState<string[]>([]);

  const updateChartKeys = (key: string, disabled: boolean) => {
    if (disabled) {
      setKeys([...keys, key]);
    } else {
      setKeys(keys.filter(keyName => keyName !== key));
    }
  };

  return {
    disabledKeys: keys,
    updateChartKeys,
  };
};
