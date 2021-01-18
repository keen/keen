import React from 'react';
import { render } from '@testing-library/react';

import EmbedWidget from './embed-widget.component';

test('renders code snippet', () => {
  const code = '<script>() => {}</script>';
  const { container } = render(<EmbedWidget>{code}</EmbedWidget>);

  expect(container).toMatchInlineSnapshot(`
    <div>
      <pre
        style="display: block; overflow-x: auto; padding: 0.5em; color: rgb(56, 58, 66); background: rgb(250, 250, 250); margin: 0px;"
      >
        <code
          class="language-javascript"
        >
          <span>
            &lt;script&gt;
          </span>
          <span
            class="hljs-function"
          >
            () =&gt;
          </span>
          <span>
             {}&lt;/script&gt;
          </span>
        </code>
      </pre>
    </div>
  `);
});
