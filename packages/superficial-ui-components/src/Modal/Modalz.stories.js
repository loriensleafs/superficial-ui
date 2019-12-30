import React from 'react';
import { ThemeProvider, theme } from '@superficial-ui/theme';
import { Modal } from './_Modal';
import { Box } from '../Box';
import { Scale } from '../Scale';
import { Card } from '../Card';
import { useDisclosure } from '@superficial-ui/hooks';

export default {
  title: 'Components/Modalz',
  component: Modal,
  decorators: [storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>],
};

export const defaultStory = () => {
  const modal = useDisclosure({ isAnimated: true });

  return (
    <>
      <button onClick={modal.onToggle}>toggle</button>
      <Modal {...modal}>
        <Scale
          as={Card}
          bottom={0}
          in={modal.isOpen}
          left={0}
          m='auto'
          maxH='calc(100vh - 7.5em)'
          minH='300px'
          onExited={modal.stopAnimation}
          pos='fixed'
          right={0}
          shadow='5xl'
          top={0}
          w='340px'
          zIndex={1300}
        >
          test
        </Scale>
      </Modal>
    </>
  );
};
defaultStory.story = {
  name: 'default',
};
