/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/naming-convention */
import * as React from 'react';
import KeenAnalysis from 'keen-analysis';
import { ChartEvents } from '@keen.io/charts';
import { PubSub } from '@keen.io/pubsub';

import KeenDataViz from '../visualizer';

import { analysisConfig } from '../fixture';

export default {
  title: 'Visualizations /Table Chart/Dataviz',
  parameters: {
    componentSubtitle: 'Table charts created with @keen.io/dataviz library',
  },
};

export const simpleResults = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'table',
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'hourly',
        },
      },
      settings: {
        margins: { top: 30, left: 45, right: 30, bottom: 60 },
      },
    });

    client
      .query({
        analysis_type: 'extraction',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2020-02-01T00:00:00.000-00:00',
          end: '2020-02-01T16:00:00.000-00:00',
        },
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return <div style={{ width: '700px', height: '500px' }} ref={container} />;
};

const pubsub = new PubSub();
const chartEvents = new ChartEvents({ pubsub });

chartEvents.subscribe(({ eventName, meta }) => console.log(eventName, meta));

export const simpleResultsEditMode = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    const client = new KeenAnalysis(analysisConfig);
    const dataviz = new KeenDataViz({
      type: 'table',
      inEditMode: true,
      eventBus: pubsub,
      container: container.current,
      widget: {
        title: {
          content: 'Book purchases',
        },
        subtitle: {
          content: 'hourly',
        },
      },
      settings: {
        columnsNamesMapping: {
          name: 'Book name',
        },
        margins: { top: 30, left: 45, right: 30, bottom: 60 },
      },
    });

    client
      .query({
        analysis_type: 'extraction',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2020-02-01T00:00:00.000-00:00',
          end: '2020-02-01T16:00:00.000-00:00',
        },
      })
      .then((res: any) => dataviz.render(res));
  }, []);

  return (
    <>
      <button
        onClick={() =>
          chartEvents.publish({ eventName: '@table/deselect-columns' })
        }
      >
        Clear selection
      </button>
      <div style={{ width: '700px', height: '500px' }} ref={container} />
    </>
  );
};
