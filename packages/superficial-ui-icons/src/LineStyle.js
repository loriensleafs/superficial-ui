import React from 'react';
import createIcon from './utils/createIcon';

export default createIcon(
  <React.Fragment>
    <defs>
      <path id='a' d='M0 0h24v24H0z' />
    </defs>
    <path d='M3 16h5v-2H3v2zm6.5 0h5v-2h-5v2zm6.5 0h5v-2h-5v2zM3 20h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM3 12h8v-2H3v2zm10 0h8v-2h-8v2zM3 4v4h18V4H3z' />
  </React.Fragment>,
  'LineStyle'
);