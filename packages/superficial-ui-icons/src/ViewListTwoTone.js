import React from 'react';
import createIcon from './utils/createIcon';

export default createIcon(
  <React.Fragment>
    <path fill='none' d='M0 0h24v24H0V0z' opacity='.87' />
    <path d='M5 11h2v2H5zm0 4h2v2H5zm0-8h2v2H5zm4 0h9v2H9zm0 8h9v2H9zm0-4h9v2H9z' opacity='.3' />
    <path d='M3 5v14h17V5H3zm4 12H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V7h2v2zm11 8H9v-2h9v2zm0-4H9v-2h9v2zm0-4H9V7h9v2z' />
  </React.Fragment>,
  'ViewListTwoTone'
);
