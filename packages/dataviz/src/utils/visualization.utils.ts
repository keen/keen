import { parseQuery, mapKeys, KEEN_KEY } from '@keen.io/parser';
import { Widgets } from '@keen.io/widgets';

import { VisualizationInput, ComponentSettings } from '../types';

export const prepareVisualization = (
  input: VisualizationInput = {},
  keysMap: Record<string, string>,
  componentSettings: ComponentSettings,
  type?: Widgets,
  presentationTimezone?: string | number
) => {
  const parser = parseQuery(input as any, type, presentationTimezone);
  try {
    // const myWorker = new Worker(new URL("./worker.js", import.meta.url)); console.log({myWorker});
    // myWorker.postMessage('hello');
    // console.log(import.meta);
    const worker = new Worker(new URL('./deep-thought.js'));
    // const worker = new Worker('./deep-thought.js');
    worker.postMessage({
      question:
        'The Answer to the Ultimate Question of Life, The Universe, and Everything.',
    });
    worker.onmessage = ({ data: { answer } }) => {
      console.log(answer);
    };
  } catch (error) {
    console.log({ error });
  }
  // const myWorker = new Worker(new URL("./worker.js", import.meta.url)); console.log({myWorker});
  // const myWorker = new Worker("worker.js"); console.log({myWorker});
  // myWorker.postMessage('hello');

  let keys: string[] = parser.keys;
  let results: Record<string, any>[] = parser.data;

  if (keysMap) {
    const labelSelector =
      'labelSelector' in componentSettings
        ? componentSettings.labelSelector
        : KEEN_KEY;
    const mappings = mapKeys(keysMap, keys, results, labelSelector);

    keys = mappings.keys;
    results = mappings.results;
  }

  return {
    keys,
    results,
  };
};
