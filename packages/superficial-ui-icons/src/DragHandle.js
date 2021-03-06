import React from 'react';
import createIcon from './utils/createIcon';

export default createIcon(
  <React.Fragment>
    <defs>
      <path id='a' d='M0 0h24v24H0V0z' />
    </defs>
    <path d='M20 9H4v2h16V9zM4 15h16v-2H4v2z' />
  </React.Fragment>,
  'DragHandle'
);
