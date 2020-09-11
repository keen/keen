export const serializeToQuery = (payload: Record<string, any>): string => {
  const acc: string[] = [];
  for (const property in payload) {
    if (payload.hasOwnProperty(property)) {
      acc.push(
        `${encodeURIComponent(property)}=${encodeURIComponent(
          payload[property]
        )}`
      );
    }
  }
  return acc.join('&');
};
