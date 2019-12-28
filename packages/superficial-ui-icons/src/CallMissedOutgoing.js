import React from 'react';
import createIcon from './utils/createIcon';

export default createIcon(
  <React.Fragment>
    <defs>
      <path id='a' d='M24 24H0V0h24v24z' />
    </defs>
    <path d='M3 8.41l9 9 7-7V15h2V7h-8v2h4.59L12 14.59 4.41 7 3 8.41z' />
  </React.Fragment>,
  'CallMissedOutgoing'
);
