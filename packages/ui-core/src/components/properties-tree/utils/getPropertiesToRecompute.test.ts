import getPropertiesToRecompute from './getPropertiesToRecompute';

test('gets properties to recompute', () => {
  const property = 'user.geo_info.province';

  expect(getPropertiesToRecompute(property)).toEqual({
    user: true,
    'user.geo_info': true,
    'user.geo_info.province': true,
  });
});
