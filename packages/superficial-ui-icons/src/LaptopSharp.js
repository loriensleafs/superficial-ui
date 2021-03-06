import React from 'react';
import createIcon from './utils/createIcon';

export default createIcon(
  <React.Fragment>
    <defs>
      <path id='a' d='M0 0h24v24H0z' />
    </defs>
    <path d='M20 18l2-2V4H2v12l2 2H0v2h24v-2h-4zM4 6h16v10H4V6z' />
  </React.Fragment>,
  'LaptopSharp'
);
