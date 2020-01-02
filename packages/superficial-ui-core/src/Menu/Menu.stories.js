import { ThemeProvider } from '@superficial-ui/theme';
import React, { useRef, useState } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { MenuItem } from '../MenuItem';
import { Menu } from './Menu';

export default {
  title: 'Components/Menu',
  component: Menu,
  decorators: [storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>],
};

export const defaultStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorEl = useRef(null);

  const handleClick = event => {
    if (anchorEl.current === null) {
      anchorEl.current = event.currentTarget;
    }
    setIsOpen(!isOpen);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <Box>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        color='primary'
        variant='solid'
        ref={anchorEl}
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl.current}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};
defaultStory.story = {
  name: 'default',
};
