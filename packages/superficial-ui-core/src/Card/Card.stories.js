import { Props, Stories } from '@storybook/addon-docs/blocks';
import {
  ExpandMoreIcon,
  FavoriteBorderIcon,
  FavoriteIcon,
  MoreVertIcon,
  ShareIcon,
} from '@superficial-ui/icons';
import { ThemeProvider } from '@superficial-ui/theme';
import React, { useState } from 'react';
import { Avatar } from '../Avatar';
import { Box } from '../Box';
import { Button } from '../Button';
import { CardActionArea } from '../CardActionArea';
import { CardActions } from '../CardActions';
import { CardContent } from '../CardContent';
import { CardHeader } from '../CardHeader';
import { CardMedia } from '../CardMedia';
import { Checkbox } from '../Checkbox';
import { Collapse } from '../Collapse';
import { Flex } from '../Flex';
import { FormControlLabel } from '../FormControlLabel';
import { IconButton } from '../IconButton';
import { Rotate } from '../Rotate';
import { Stack } from '../Stack';
import { Caption, H2, H4, H6, P } from '../Text';
import { Card } from './Card';

export default {
  title: 'Components/Card',
  component: Card,
  decorators: [storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>],
};

const DemoCard = props => (
  <Flex
    align={['center', null, 'flex-start']}
    bg='#fafafa'
    border='1px solid'
    borderColor='border'
    direction={['column-reverse', null, 'row']}
    mb='4xl'
    p='lg'
    radius='md'
    {...props}
  />
);

const DemoControlLabel = props => (
  <FormControlLabel color='text.secondary' font='body' {...props} />
);

const DemoCheckbox = props => <Checkbox color='primary' size='sm' {...props} />;

/* ---------------------------- Interactive Card ---------------------------- */

const InteractiveHeader = () => (
  <CardHeader
    avatar={
      <Avatar
        aria-label='Electric Blue Gecko (Lygodactylus williamsi)'
        name='L'
        sx={{ color: 'white', bg: '#3f9eb6' }}
      />
    }
    action={
      <IconButton aria-label='settings'>
        <MoreVertIcon />
      </IconButton>
    }
    title='Electric Blue Gecko'
    subheader='Lygodactylus williamsi'
  />
);

const InteractiveMedia = () => (
  <CardMedia
    h='140px'
    image='https://i.pinimg.com/originals/f5/26/0f/f5260f1f55ccb632535b8a143199ac8a.jpg'
    title='Electric Blue Gecko (Lygodactylus williamsi)'
  />
);

const InteractiveContent = () => (
  <CardContent>
    <P color='text.secondary' fontSize='sm' marginIsDisabled>
      Lygodactylus williamsi is a critically endangered species of lizards,
      endemic to a small area of Tanzania. Common names include turquoise dwarf
      gecko, William's dwarf gecko, or, in the pet trade, electric blue gecko.
    </P>
  </CardContent>
);

const InteractiveActions = () => {
  const [isFavorite, setFavorite] = React.useState(false);

  return (
    <CardActions>
      <Button color='primary'>Learn More</Button>
      <IconButton
        aria-label='like'
        ml='auto'
        onClick={() => setFavorite(!isFavorite)}
        sx={{ color: isFavorite ? 'red.500' : 'text.secondary' }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <IconButton aria-label='share'>
        <ShareIcon />
      </IconButton>
    </CardActions>
  );
};

export const interactive = () => null;
interactive.story = {
  name: 'Interactive',
  parameters: {
    component: Card,
    subcomponents: {
      'Card Header': CardHeader,
      'Card Action Area': CardActionArea,
      'Card Content': CardContent,
      'Card Media': CardMedia,
      'Card Actions': CardActions,
    },
    docs: {
      page: () => {
        const [hasHeader, setHeader] = React.useState(false);
        const [hasActionArea, setActionArea] = React.useState(false);
        const [hasMedia, setMedia] = React.useState(true);
        const [hasContent, setContent] = React.useState(true);
        const [hasActions, setActions] = React.useState(false);

        const contentArea = (
          <>
            {hasMedia && <InteractiveMedia />}
            {hasContent && <InteractiveContent />}
          </>
        );

        return (
          <>
            <ThemeProvider>
              <H2>Card</H2>
              <H6 color='text.secondary'>
                Cards contain content and actions about a single subject.
              </H6>
              <br />
              <P>
                Cards are surfaces that display content and actions on a single
                topic. They should be easy to scan for relevant and actionable
                information. Elements, like text and images, should be placed on
                them in a way that clearly indicates hierarchy.
              </P>
              <DemoCard>
                <Flex flex={1} justify='center'>
                  <Card w='100%' maxW='350px'>
                    {hasHeader && <InteractiveHeader />}
                    {hasActionArea ? (
                      <CardActionArea>{contentArea}</CardActionArea>
                    ) : (
                      contentArea
                    )}
                    {hasActions && <InteractiveActions />}
                  </Card>
                </Flex>
                <Flex
                  direction={['row', null, 'column']}
                  mb={['md', null, '0px']}
                  wrap='wrap'
                >
                  <DemoControlLabel>
                    <DemoCheckbox
                      isChecked={hasHeader}
                      onChange={() => setHeader(!hasHeader)}
                    />
                    <Caption>Card Header</Caption>
                  </DemoControlLabel>
                  <DemoControlLabel>
                    <DemoCheckbox
                      isChecked={hasActionArea}
                      onChange={() => setActionArea(!hasActionArea)}
                    />
                    <Caption>Card Action Area</Caption>
                  </DemoControlLabel>
                  <DemoControlLabel>
                    <DemoCheckbox
                      isChecked={hasMedia}
                      onChange={() => setMedia(!hasMedia)}
                    />
                    <Caption>Card Media</Caption>
                  </DemoControlLabel>
                  <DemoControlLabel>
                    <DemoCheckbox
                      isChecked={hasContent}
                      onChange={() => setContent(!hasContent)}
                    />
                    <Caption>Card Content</Caption>
                  </DemoControlLabel>
                  <DemoControlLabel>
                    <DemoCheckbox
                      isChecked={hasActions}
                      onChange={() => setActions(!hasActions)}
                    />
                    <Caption>Card Actions</Caption>
                  </DemoControlLabel>
                </Flex>
              </DemoCard>
            </ThemeProvider>
            <Props />
            <br />
            <Stories
              slot={s => s.filter(story => story.story !== 'Interactive')}
            />
          </>
        );
      },
    },
  },
};

/* --------------------------- 📖 BASIC BITCH CARD -------------------------- */

const Bullet = props => (
  <Box
    as='span'
    display='inline-block'
    m='0 2px'
    transform='scale(0.8)'
    {...props}
  >
    •
  </Box>
);

export const basic = () => (
  <Stack isCentered>
    <Card wMin='275px'>
      <CardContent>
        <P color='text.secondary' fontSize='sm'>
          Word of the Day
        </P>
        <H2 marginIsDisabled variant='h5'>
          be
          <Bullet />
          nev<Bullet>o</Bullet>lent
        </H2>
        <P color='text.secondary' mb='md'>
          adjective
        </P>
        <P fontSize='sm' marginIsDisabled>
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </P>
      </CardContent>
      <CardActions px='xs'>
        <Button size='sm'>Learn More</Button>
      </CardActions>
    </Card>
  </Stack>
);
basic.story = {
  name: 'Basic Card',
  parameters: {
    docs: {
      page: () => (
        <>
          <ThemeProvider>
            <H4>Basic Card</H4>
            <P color='text.secondary'>
              Although cards can support multiple actions, UI controls, and an
              overflow menu, use restraint and remember that cards are entry
              points to more complex and detailed information.
            </P>
          </ThemeProvider>
          <br />
          <Stories
            slot={s => s.filter(story => story.story === 'Basic Card')}
          />
        </>
      ),
    },
  },
};

/* -------------------- 📖 CARD WITH COMPLEX INTERACTION -------------------- */

export const complex = () => {
  const [isExpanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => setExpanded(!isExpanded);

  return (
    <Stack isCentered>
      <Card maxW='345px'>
        <CardHeader
          avatar={
            <Avatar
              aria-label='recipe'
              name='R'
              sx={{ color: 'white', bg: 'red.400' }}
            />
          }
          title='Shrimp and Chorizo Paella'
          subheader='September 14, 2016'
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardMedia
          h='0px'
          image='http://assets.wholefoodsmarket.com/recipes/4450/2048/1536/4450-4.jpg'
          pt='56.25%'
          title='Paella dish'
        />
        <CardContent>
          <P color='text.secondary' fontSize='sm' marginIsDisabled>
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </P>
        </CardContent>
        <CardActions>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
          <IconButton
            aria-expanded={isExpanded}
            aria-label='show more'
            ml='auto'
            onClick={handleExpandClick}
          >
            <Rotate degree={isExpanded ? 180 : 0} display='flex'>
              <ExpandMoreIcon />
            </Rotate>
          </IconButton>
        </CardActions>
        <Collapse in={!isExpanded}>
          <CardContent>
            <P>Method:</P>
            <P>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </P>
            <P>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </P>
            <P>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that don’t
              open.)
            </P>
            <P marginIsDisabled>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </P>
          </CardContent>
        </Collapse>
      </Card>
    </Stack>
  );
};
complex.story = {
  name: 'Complex Interaction',
  parameters: {
    docs: {
      page: () => (
        <>
          <ThemeProvider>
            <H4>Card with Complex Interaction</H4>
            <P color='text.secondary'>On desktop, cards content can expand.</P>
          </ThemeProvider>
          <br />
          <Stories
            slot={stories =>
              stories.filter(story => story.story === 'Complex Interaction')
            }
          />
        </>
      ),
    },
  },
};
