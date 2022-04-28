import { exportToCSV } from './export-to-csv';

test('some random description', () => {
  const data = [
    ['origin_country', 'U,S'],
    ['business_name', 'Buz'],
  ];
  const result = exportToCSV(data);

  expect(result).toMatchInlineSnapshot(`
    "origin_country,\\"U,S\\"
    business_name,Buz
    "
  `);
});
