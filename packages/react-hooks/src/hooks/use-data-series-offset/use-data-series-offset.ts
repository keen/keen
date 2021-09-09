import { useState, useEffect } from 'react';
/**
 * Hook that allows to set data series offset based on legend parameters
 * @param legendEnabled:
 */
export const useDataSeriesOffset = (
  colorsLenght: number,
  legendEnabled: boolean
) => {
  const [dataSeriesOffset, setDataSeriesOffset] = useState<[number, number]>([
    0,
    colorsLenght,
  ]);

  useEffect(() => {
    if (!legendEnabled) {
      setDataSeriesOffset([0, colorsLenght]);
    }
  }, [legendEnabled]);

  return {
    setDataSeriesOffset,
    dataSeriesOffset,
  };
};
