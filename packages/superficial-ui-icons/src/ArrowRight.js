import React from 'react';
import createIcon from './utils/createIcon';

export default createIcon(
  <React.Fragment>
    <path d='M10 17l5-5-5-5v10z' />
    <path fill='none' d='M0 24V0h24v24H0z' />
  </React.Fragment>,
  'ArrowRight'
);
