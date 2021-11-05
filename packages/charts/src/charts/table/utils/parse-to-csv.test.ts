import { parseToCSV } from './parse-to-csv';

const elementsToParse = [
  ['110.50$', 'Mobile', 'facebook/cpc'],
  ['100.50$', 'Mobile', 'google/ads'],
];

describe('parseToCSV()', () => {
  test('Generates CSV data', () => {
    const csvData = parseToCSV(elementsToParse);
    expect(csvData).toEqual(
      `110.50$,Mobile,facebook/cpc\n100.50$,Mobile,google/ads\n`
    );
  });

  test('Generates CSV data, with specified column delimiter', () => {
    const csvData = parseToCSV(elementsToParse, ';');
    expect(csvData).toEqual(
      `110.50$;Mobile;facebook/cpc\n100.50$;Mobile;google/ads\n`
    );
  });

  test('Generates CSV data, with specified line delimiter', () => {
    const csvData = parseToCSV(elementsToParse, ';', '|');
    expect(csvData).toEqual(
      `110.50$;Mobile;facebook/cpc|100.50$;Mobile;google/ads|`
    );
  });
});
