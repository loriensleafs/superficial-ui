import React from 'react';
import createIcon from './utils/createIcon';

export default createIcon(
  <React.Fragment>
    <defs>
      <path id='a' d='M0 0h24v24H0z' />
    </defs>
    <path d='M20 7h-4V5c0-.55-.22-1.05-.59-1.41C15.05 3.22 14.55 3 14 3h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm1 13.5l-1-1 3-3-3-3 1-1 4 4-4 4z' />
  </React.Fragment>,
  'NextWeek'
);