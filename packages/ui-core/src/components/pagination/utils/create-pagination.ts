type PaginationSettings = {
  currentPage: number;
  totalPages: number;
};

const OVERFLOW_PATTERN = '...';

/**
 * Creates collection of pages based on provided pagination settings
 *
 * @param settings - pagination settings
 * @param paginationPagesLimit - pagination toggle on / off treshold
 * @return collection of pages
 *
 */
export const createPagination = (
  { currentPage, totalPages }: PaginationSettings,
  paginationPagesLimit = 8
): Array<string | number> => {
  if (totalPages < paginationPagesLimit) {
    return new Array(totalPages).fill(true).map((_, idx) => idx + 1);
  }

  const visiblePages = paginationPagesLimit - 1;
  const middlePage = Math.round(visiblePages / 2);

  const isWithinEndRange = currentPage > totalPages - middlePage;
  const isWithinStartRange = currentPage <= middlePage;

  if (isWithinEndRange) {
    return [
      1,
      OVERFLOW_PATTERN,
      ...new Array(visiblePages - 2)
        .fill(totalPages)
        .map((page, idx) => page - idx)
        .reverse(),
    ];
  }

  if (isWithinStartRange) {
    return [
      ...new Array(visiblePages - 2).fill(true).map((_, idx) => idx + 1),
      OVERFLOW_PATTERN,
      totalPages,
    ];
  }

  const values = new Array(visiblePages).fill(currentPage).map((_, idx) => {
    if (idx + 1 === middlePage) return currentPage;
    return currentPage - middlePage + idx + 1;
  });

  return [
    1,
    OVERFLOW_PATTERN,
    ...values.slice(2, values.length - 2),
    OVERFLOW_PATTERN,
    totalPages,
  ];
};
