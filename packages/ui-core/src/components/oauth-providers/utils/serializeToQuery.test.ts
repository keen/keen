import { serializeToQuery } from './serializeToQuery';

describe('serializeToQuery()', () => {
  it('should serialize properties to query params', () => {
    const payload = {
      clientId: 'client-id',
      redirectUri: 'https://local-dev.keen.io',
    };

    expect(serializeToQuery(payload)).toMatchInlineSnapshot(
      `"clientId=client-id&redirectUri=https%3A%2F%2Flocal-dev.keen.io"`
    );
  });
});
