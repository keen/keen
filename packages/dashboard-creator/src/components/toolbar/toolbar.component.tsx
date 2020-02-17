import React, { FC } from 'react';

const Toolbar: FC<{}> = () => (
  <ul>
    <li draggable unselectable="on" data-widget="widget 1">
      Widget #1
    </li>
  </ul>
);

export default Toolbar;
