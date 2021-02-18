import createTree from './createTree';

test('creates JSON tree', () => {
  const records = {
    'category.details.gender': 'string',
    'category.id': 'string',
    'category.details.name': 'string',
    age: 'number',
  };

  expect(createTree(records)).toMatchSnapshot();
});

test('creates JSON tree for conflicted nodes', () => {
  const records = {
    category: 'null',
    'category.details.gender': 'string',
    'category.id': 'string',
    'category.details.name': 'string',
    age: 'number',
  };

  expect(createTree(records)).toMatchSnapshot();
});

test.only('creates JSON tree for list in schema', () => {
  const records = {
    category: 'null',
    'category.details': 'list',
    'category.details.gender': 'string',
    'category.details.id': 'num',
    'category.details.0.id': 'num',
    'category.details.0.name': 'num',
    'category.details.1.id': 'num',
    'category.details.2.name': 'num',
  };

  expect(createTree(records)).toMatchSnapshot();
});
