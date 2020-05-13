import { useState } from 'react';

export const useLegend = () => {
  const [keys, setKeys] = useState<string[]>([]);

  const updateKeys = (key: string, disabled: boolean) => {
    if (disabled) {
      Array.isArray(key) ? setKeys([...keys, ...key]) : setKeys([...keys, key]);
    } else {
      Array.isArray(key)
        ? setKeys(keys.filter(keyName => !key.includes(keyName)))
        : setKeys(keys.filter(keyName => keyName !== key));
    }
  };

  return {
    disabledKeys: keys,
    updateKeys,
  };
};
