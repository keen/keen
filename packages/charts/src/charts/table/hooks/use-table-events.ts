import { useEffect, useCallback } from 'react';

import { createColumnSelectionEvent } from '../events';
import { ChartEvents } from '../../../events';

import { TableEvents, ValueFormatter } from '../types';

type Options = {
  chartEvents: ChartEvents<TableEvents>;
  onDeselectColumns: () => void;
};

export const useTableEvents = ({ chartEvents, onDeselectColumns }: Options) => {
  useEffect(() => {
    let unsubscribe: () => void = null;

    if (chartEvents) {
      unsubscribe = chartEvents.subscribe(({ eventName }) => {
        switch (eventName) {
          case '@table/deselect-columns':
            onDeselectColumns();
        }
      });
    }

    return () => unsubscribe && unsubscribe();
  }, [chartEvents, onDeselectColumns]);

  const publishColumnSelection = useCallback(
    (
      data: Record<string, any>[],
      formatters: ValueFormatter,
      selectedColumns: {
        columnName: string;
        index: number;
      }[]
    ) => {
      if (chartEvents) {
        const eventPayload = createColumnSelectionEvent({
          data,
          selectedColumns,
          formatters,
        });

        chartEvents.publish(eventPayload);
      }
    },
    [chartEvents]
  );

  return {
    publishColumnSelection,
  };
};
