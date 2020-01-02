import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import {
  BeachAccessIcon,
  CommentIcon,
  DraftsIcon,
  ExpandMoreIcon,
  ImageIcon,
  InboxIcon,
  MoveToInboxIcon,
  SendIcon,
  StarBorderIcon,
  WifiIcon,
  WorkIcon,
} from '@superficial-ui/icons';
import { ThemeProvider } from '@superficial-ui/theme';
import * as React from 'react';
import { Avatar } from '../Avatar';
import { Box } from '../Box';
import { Card } from '../Card';
import { Checkbox } from '../Checkbox';
import { Collapse } from '../Collapse';
import { Divider } from '../Divider';
import { IconButton } from '../IconButton';
import { ListItem } from '../ListItem';
import { ListItemText } from '../ListItemText';
import { ListSubheader } from '../ListSubheader';
import { Rotate } from '../Rotate';
import { Stack } from '../Stack';
import { Switch } from '../Switch';
import { List } from './List';

export default {
  title: 'Components/List',
  component: List,
  decorators: [
    withInfo,
    withKnobs,
    storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>,
  ],
};

export const defaultStory = () => (
  <Stack isCentered>
    <Card sx={{ width: '360px' }}>
      <List as='nav' aria-label='main mailbox folders'>
        <ListItem isButton>
          <InboxIcon />
          <ListItemText primaryText='Inbox' />
        </ListItem>
        <ListItem isButton>
          <DraftsIcon />
          <ListItemText primaryText='Drafts' />
        </ListItem>
      </List>
      <Divider />
      <List as='nav' aria-label='secondary mailbox folders'>
        <ListItem isButton>
          <ListItemText primaryText='Trash' />
        </ListItem>
        <ListItem isButton>
          <ListItemText primaryText='Spam' />
        </ListItem>
      </List>
    </Card>
  </Stack>
);
defaultStory.story = {
  name: 'default',
};

export const nested = () => {
  const [isExpanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => setExpanded(!isExpanded);

  return (
    <Stack isCentered>
      <Card sx={{ width: '360px' }}>
        <List as='nav' aria-labeledby='nested-list-subheader'>
          <ListSubheader as='div' id='nested-list-subheader'>
            Nested List Items
          </ListSubheader>
          <ListItem isButton>
            <SendIcon />
            <ListItemText primaryText='Sent mail' />
          </ListItem>
          <ListItem isButton>
            <DraftsIcon />
            <ListItemText primaryText='Drafts' />
          </ListItem>
          <ListItem isButton onClick={handleExpandClick}>
            <MoveToInboxIcon />
            <ListItemText primaryText='Inbox' />
            <Rotate degree={isExpanded ? 180 : 0} sx={{ display: 'flex' }}>
              <ExpandMoreIcon size='md' />
            </Rotate>
          </ListItem>
          <Collapse in={isExpanded}>
            <List as='div' paddingIsDisabled>
              <ListItem isButton sx={{ pl: '3xl' }}>
                <StarBorderIcon />
                <ListItemText primaryText='Starred' />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Card>
    </Stack>
  );
};
nested.story = {
  name: 'Nested List',
};

export const folder = () => (
  <Stack isCentered>
    <Card sx={{ width: '360px' }}>
      <List>
        <ListItem>
          <Avatar>
            <ImageIcon />
          </Avatar>
          <ListItemText primaryText='Photos' secondaryText='Jan 9, 2014' />
        </ListItem>
        <ListItem>
          <Avatar>
            <WorkIcon />
          </Avatar>
          <ListItemText primaryText='Work' secondaryText='Jan 7, 2014' />
        </ListItem>
        <ListItem>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
          <ListItemText primaryText='Vacation' secondaryText='July 20, 2014' />
        </ListItem>
      </List>
    </Card>
  </Stack>
);
folder.story = {
  name: 'Folder List',
};

export const controls = () => {
  const [primaryChecked, setPrimaryChecked] = React.useState([0]);
  const [secondaryChecked, setSecondaryChecked] = React.useState([1]);
  const [hotspotIsOn, setHotspot] = React.useState(false);

  const handleClick = (value, isPrimary = false) => () => {
    const state = isPrimary ? primaryChecked : secondaryChecked;
    const currentIndex = state.indexOf(value);
    const nextState = [...state];

    if (currentIndex === -1) {
      nextState.push(value);
    } else {
      nextState.splice(currentIndex, 1);
    }

    if (isPrimary) setPrimaryChecked(nextState);
    if (!isPrimary) setSecondaryChecked(nextState);
  };

  return (
    <Stack isCentered isVertical>
      <Card sx={{ width: '360px' }}>
        <List>
          {[0, 1, 2, 3].map(value => {
            const labelId = `checkbox-list-label-${value}`;
            return (
              <ListItem
                key={value}
                role={undefined}
                isDense
                isButton
                onClick={handleClick(value, true)}
              >
                <Checkbox
                  isChecked={primaryChecked.includes(value)}
                  tabIndex={-1}
                  aria-labelledby={labelId}
                />
                <ListItemText
                  id={labelId}
                  primaryText={`Line item ${value + 1}`}
                />
                <IconButton aria-label='comments'>
                  <CommentIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      </Card>
      <Card sx={{ width: '360px' }}>
        <List>
          {[0, 1, 2, 3].map(value => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem key={value} role={undefined} isDense>
                <Avatar alt={`Avatar n${value + 1}`} />
                <ListItemText
                  id={labelId}
                  primaryText={`Line item ${value + 1}`}
                />
                <Checkbox
                  isChecked={secondaryChecked.includes(value)}
                  onChange={handleClick(value)}
                />
              </ListItem>
            );
          })}
        </List>
      </Card>
      <Card sx={{ width: '360px' }}>
        <List>
          <ListSubheader>Settings/Wi-Fi hotspot</ListSubheader>
          <ListItem sx={{ bg: hotspotIsOn ? 'primary' : 'gray' }}>
            <WifiIcon sx={{ color: 'white' }} />
            <ListItemText
              primaryText={hotspotIsOn ? 'on' : 'off'}
              color='white'
            />
            <Switch
              color='default'
              isChecked={hotspotIsOn}
              onChange={event => setHotspot(!hotspotIsOn)}
            />
          </ListItem>
        </List>
      </Card>
    </Stack>
  );
};
controls.story = {
  name: 'Select Controls',
};

export const pinnedSubheader = () => (
  <Stack isCentered>
    <Card sx={{ width: '360px' }}>
      <List
        paddingIsDisabled
        sx={{
          position: 'relative',
          maxHeight: '300px',
          overflow: 'auto',
          bg: 'inherit',
        }}
      >
        {[0, 1, 2, 3, 4].map(sectionId => (
          <Box as='li' key={`section-${sectionId}`} sx={{ bg: 'inherit' }}>
            <Box as='ul' sx={{ p: '0px', bg: 'inherit' }}>
              <ListSubheader
                isSticky
              >{`I'm sticky ${sectionId}`}</ListSubheader>
              {[0, 1, 2].map(item => (
                <ListItem key={`item-${sectionId}-${item}`}>
                  <ListItemText primaryText={`Item ${item}`} />
                </ListItem>
              ))}
            </Box>
          </Box>
        ))}
      </List>
    </Card>
  </Stack>
);
pinnedSubheader.story = {
  name: 'Pinned Subheader',
};
