import { useEffect, useCallback } from 'react';
import { ChartEvents } from '@keen.io/charts';

import { createColumnSelectionEvent } from '../events';

import { TableEvents, ValueFormatter } from '../types';

type Options = {
  chartEvents: ChartEvents<TableEvents>;
  onDeselectColumns: () => void;
};

/**
 * Hook responsible for handling ChartEvents logic.
 *
 * @param chartEvents - chart events bus
 * @param onDeselectColumns - Deselect columns event handler
 * @return table events handlers
 *
 */
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

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [chartEvents]);

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
