import { ThemeProvider } from '@superficial-ui/theme';
import * as React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { List } from '../List';
import { ListItem } from '../ListItem';
import { ListItemText } from '../ListItemText';
import { Popover } from './Popover';

export default {
  title: 'Components/Popover',
  component: Popover,
  decorators: [storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>],
};

export const defaultStory = () => {
  const contentAnchorRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const getContentAnchorEl = () => contentAnchorRef.current;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        color='primary'
        variant='outlined'
        aria-describedby={id}
        onClick={handleClick}
      >
        Open Popover
      </Button>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        getContentAnchorEl={getContentAnchorEl}
        id={id}
        isOpen={open}
        onClose={handleClose}
        sx={{
          width: '360px',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List as='nav' ref={contentAnchorRef}>
          <ListItem isButton onClick={handleClose}>
            <ListItemText primaryText='Trash' />
          </ListItem>
          <ListItem isButton onClick={handleClose}>
            <ListItemText primaryText='Spam' />
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
};
defaultStory.story = {
  name: 'default',
};
