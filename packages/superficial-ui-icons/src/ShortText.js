import React from 'react';
import createIcon from './utils/createIcon';

export default createIcon(
  <React.Fragment>
    <defs>
      <path id='a' d='M0 0h24v24H0V0z' />
    </defs>
    <path d='M4 9h16v2H4zm0 4h10v2H4z' />
  </React.Fragment>,
  'ShortText'
);
