import { Props } from '@storybook/addon-docs/blocks';
import { CloseIcon } from '@superficial-ui/icons';
import { ThemeProvider } from '@superficial-ui/theme';
import React, { useState } from 'react';
import { Button } from '../Button';
import { Card } from '../Card';
import { CardActions } from '../CardActions';
import { CardContent } from '../CardContent';
import { CardHeader } from '../CardHeader';
import { Fade } from '../Fade';
import { Flex } from '../Flex';
import { FormControlLabel } from '../FormControlLabel';
import { IconButton } from '../IconButton';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';
import { Scale } from '../Scale';
import { SlideIn } from '../SlideIn';
import { Caption, H2, H6, P } from '../Text';
import { Modal } from './Modal';

/* -------------------------------------------------------------------------- */
/*                              📖 MODAL STORIES                              */
/* -------------------------------------------------------------------------- */

export default {
  title: 'Components/Modal',
  component: Modal,
  decorators: [storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>],
};

/* --------------------- 📖 INTERACTIVE DEMO COMPONENTS --------------------- */

const DemoIntro = () => (
  <>
    <H2>Modal</H2>
    <H6 color='text.secondary'>
      The modal component provides a solid foundation for creating dialogs,
      popovers, lightboxes, or whatever else.
    </H6>
    <br />
    <P>
      The Modal is a lower-level component for composing overlays. The Dialog,
      Drawer, Menu and Popover components are all composed by the Modal
      component.
    </P>
  </>
);

const DemoControlLabel = props => (
  <FormControlLabel color='text.secondary' font='body' {...props} />
);

const DemoRadio = props => <Radio color='primary' size='sm' {...props} />;

const DemoCard = props => (
  <Card
    as={Flex}
    bg='#fafafa'
    border='1px solid'
    borderColor='border'
    mb='4xl'
    p='lg'
    shadow='none'
    {...props}
  />
);

const Content = ({ closeModal }) => (
  <Flex
    direction='column'
    justify='space-between'
    pb='sm'
    px='md'
    sx={{ boxSizing: 'border-box' }}
    w='100%'
  >
    <CardHeader
      title={<H6 marginIsDisabled>Modal</H6>}
      action={
        <IconButton color='primary' onClick={() => closeModal()}>
          <CloseIcon />
        </IconButton>
      }
    />
    <CardContent pt='xs'>
      <P color='text.secondary'>
        Enter/exit animations can easily be added to the Modal's content by
        wrapping it with a transition component. To have the animation applied
        direction to your root component instead of wrapping it, just pass your
        component to the transition component via it's 'as' prop.
      </P>
      <P color='text.secondary' marginIsDisabled>
        Change the demo's selected animation and open the Modal again to see it.
      </P>
    </CardContent>
    <CardActions>
      <Button
        color='primary'
        ml='auto'
        onClick={() => closeModal()}
        variant='solid'
      >
        Close
      </Button>
    </CardActions>
  </Flex>
);

const animatedComponents = {
  fade: Fade,
  scale: Scale,
  slideIn: SlideIn,
};

/* --------------------------- 📖 INTERACTIVE DEMO -------------------------- */
export const interactive = () => null;
interactive.story = {
  name: 'Interactive',
  parameters: {
    component: Modal,
    docs: {
      page: () => {
        const [isOpen, setOpen] = useState(false);
        const [modalAnimation, setModalAnimation] = useState('scale');

        const AnimatedComponent = animatedComponents[modalAnimation];

        const openModal = () => setOpen(true);
        const closeModal = () => setOpen(false);

        return (
          <>
            <ThemeProvider>
              <DemoIntro />
              <DemoCard>
                <Flex w='100%' direction='column' align='center'>
                  <Flex w='100%' align='flex-start' direction='column'>
                    <Caption marginIsDisabled>Modal transition:</Caption>
                    <RadioGroup
                      onChange={event => setModalAnimation(event.target.value)}
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                      value={modalAnimation}
                    >
                      <DemoControlLabel>
                        <DemoRadio value='fade'>fade</DemoRadio>
                        <Caption>Fade</Caption>
                      </DemoControlLabel>
                      <DemoControlLabel>
                        <DemoRadio value='slideIn'>slide in</DemoRadio>
                        <Caption>Slide In</Caption>
                      </DemoControlLabel>
                      <DemoControlLabel>
                        <DemoRadio value='scale'>scale</DemoRadio>
                        <Caption>Scale</Caption>
                      </DemoControlLabel>
                    </RadioGroup>
                  </Flex>
                  <Button
                    color='primary'
                    onClick={openModal}
                    variant='outlined'
                  >
                    Open Modal
                  </Button>
                </Flex>
                <Modal
                  isOpen={isOpen}
                  onClose={closeModal}
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <AnimatedComponent
                    as={Card}
                    hMin='300px'
                    in={isOpen}
                    shadow='5xl'
                    w='340px'
                  >
                    <Content closeModal={closeModal} />
                  </AnimatedComponent>
                </Modal>
              </DemoCard>
            </ThemeProvider>
            <Props />
          </>
        );
      },
    },
  },
};
