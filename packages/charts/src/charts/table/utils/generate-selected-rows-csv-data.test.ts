import { generateSelectedRowsCSVData } from './generate-selected-rows-csv-data';

const selectedRows = [
  {
    price: {
      value: '110.50$',
      formatterType: 'number',
    },
    platform: {
      value: 'Mobile',
    },
    referrer: {
      value: 'facebook/cpc',
    },
  },
  {
    price: {
      value: '100.50$',
      formatterType: 'number',
    },
    platform: {
      value: 'Mobile',
    },
    referrer: {
      value: 'google/ads',
    },
  },
];
const columnsKeys = ['price', 'platform', 'referrer'];
const columnsNamesMapping = { platform: 'Platform renamed' };

describe('generateSelectedRowsCSVData()', () => {
  test('Generates selected rows CSV data', () => {
    const csvData = generateSelectedRowsCSVData({ selectedRows, columnsKeys });
    expect(csvData).toEqual(
      `110.50$;Mobile;facebook/cpc\n100.50$;Mobile;google/ads\n`
    );
  });

  test('Generates selected rows CSV data and adds corresponding column names', () => {
    const csvData = generateSelectedRowsCSVData({
      selectedRows,
      columnsKeys,
      addColumnNames: true,
    });
    expect(csvData).toEqual(
      `price;platform;referrer\n110.50$;Mobile;facebook/cpc\n100.50$;Mobile;google/ads\n`
    );
  });

  test('Generates selected rows CSV data and applies correct column names mappings', () => {
    const csvData = generateSelectedRowsCSVData({
      selectedRows,
      columnsKeys,
      addColumnNames: true,
      columnsNamesMapping,
    });
    expect(csvData).toEqual(
      `price;Platform renamed;referrer\n110.50$;Mobile;facebook/cpc\n100.50$;Mobile;google/ads\n`
    );
  });
});
