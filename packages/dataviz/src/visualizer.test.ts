import ReactDOM from 'react-dom';

import Visualizer from './visualizer';
import { renderWidget } from './render-widget';

jest.mock('react-dom');
jest.mock('./render-widget');

beforeEach(() => {
  renderWidget.mockReset();
});

test('calls "unmountComponentAtNode" to destroy component', () => {
  const dataviz = new Visualizer({
    container: '#container',
    type: 'bar',
  });

  dataviz.destroy();

  expect(ReactDOM.unmountComponentAtNode).toHaveBeenCalled();
});

test('calls "renderWidget" and omits query parser', () => {
  const data = [{ users: 3, licenses: 52, shops: 12 }];
  const dataviz = new Visualizer({
    container: '#container',
    type: 'bar',
    settings: {
      data,
      keys: ['licenses'],
      barPadding: 0.1,
    },
  });

  dataviz.render();
  const functionArg = renderWidget.mock.calls[0][0];

  expect(functionArg).toMatchObject({
    type: 'bar',
    componentSettings: expect.objectContaining({
      data,
      barPadding: 0.1,
      keys: ['licenses'],
    }),
    widgetSettings: expect.any(Object),
    keys: [],
    data: [],
  });
});

test('renders error message for empty analysis results', () => {
  const dataviz = new Visualizer({
    container: '#container',
    type: 'bar',
  });

  dataviz.error = jest.fn();
  dataviz.render({ result: [] });

  expect(dataviz.error).toHaveBeenCalled();
});

test('renders error message for analysis results with empty events', () => {
  const dataviz = new Visualizer({
    container: '#container',
    type: 'bar',
  });

  dataviz.error = jest.fn();
  dataviz.render({ result: [{}, {}] });

  expect(dataviz.error).toHaveBeenCalled();
});
