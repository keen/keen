import { createPagination } from './create-pagination';

test('returns all pages without hidden ranges', () => {
  expect(
    createPagination({
      currentPage: 4,
      totalPages: 5,
    })
  ).toEqual([1, 2, 3, 4, 5]);
});

test('returns pages with hidden range for ending offset', () => {
  expect(
    createPagination({
      currentPage: 3,
      totalPages: 10,
    })
  ).toMatchInlineSnapshot(`
    Array [
      1,
      2,
      3,
      4,
      5,
      "...",
      10,
    ]
  `);
});

test('returns pages with hidden range for start and end offset', () => {
  expect(
    createPagination({
      currentPage: 5,
      totalPages: 10,
    })
  ).toMatchInlineSnapshot(`
    Array [
      1,
      "...",
      4,
      5,
      6,
      "...",
      10,
    ]
  `);
});

test('creates pagination with hidden range for start and end offset', () => {
  expect(
    createPagination({
      currentPage: 167,
      totalPages: 300,
    })
  ).toMatchInlineSnapshot(`
    Array [
      1,
      "...",
      166,
      167,
      168,
      "...",
      300,
    ]
  `);
});

test('returns pages with hidden range for start offset', () => {
  expect(
    createPagination({
      currentPage: 9,
      totalPages: 10,
    })
  ).toMatchInlineSnapshot(`
    Array [
      1,
      "...",
      6,
      7,
      8,
      9,
      10,
    ]
  `);
});

test('returns pages with hidden range for start offset', () => {
  expect(
    createPagination({
      currentPage: 8,
      totalPages: 10,
    })
  ).toMatchInlineSnapshot(`
    Array [
      1,
      "...",
      6,
      7,
      8,
      9,
      10,
    ]
  `);
});

test('returns pages with hidden range for start offset', () => {
  expect(
    createPagination({
      currentPage: 6,
      totalPages: 10,
    })
  ).toMatchInlineSnapshot(`
    Array [
      1,
      "...",
      5,
      6,
      7,
      "...",
      10,
    ]
  `);
});

test('creates pages based on provided pagination limit', () => {
  const paginationPagesLimit = 20;
  expect(
    createPagination(
      {
        currentPage: 17,
        totalPages: 121,
      },
      paginationPagesLimit
    )
  ).toMatchInlineSnapshot(`
    Array [
      1,
      "...",
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      "...",
      121,
    ]
  `);
});

test('creates pages with hidden range for start offset when "currentPage" equals "totalPages"', () => {
  expect(
    createPagination({
      currentPage: 22,
      totalPages: 22,
    })
  ).toMatchInlineSnapshot(`
    Array [
      1,
      "...",
      18,
      19,
      20,
      21,
      22,
    ]
  `);
});
