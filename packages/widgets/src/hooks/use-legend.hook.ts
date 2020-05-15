import { useState } from 'react';

export const useLegend = () => {
  const [keys, setKeys] = useState<string[]>([]);

  const updateKeys = (key: string, disabled: boolean) => {
    if (disabled) {
      setKeys(keys => [...keys, key]);
    } else {
      setKeys(keys => keys.filter(keyName => keyName !== key));
    }
  };

  return {
    disabledKeys: keys,
    updateKeys,
  };
};
