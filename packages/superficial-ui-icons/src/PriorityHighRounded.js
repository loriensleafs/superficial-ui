import React from 'react';
import createIcon from './utils/createIcon';

export default createIcon(
  <React.Fragment>
    <circle cx='12' cy='19' r='2' />
    <path d='M12 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z' />
  </React.Fragment>,
  'PriorityHighRounded'
);
