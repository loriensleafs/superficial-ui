import { useBreakpointIndex } from '@theme-ui/match-media';

const keys = ['sm', 'md', 'lg', 'xl'];

export const useBreakpoint = () => {
  const bp = useBreakpointIndex();
  return [
    keys[bp],
    keys.reduce(
      (acc, key, index) => ({
        ...acc,
        [key]: bp === index ? 'at' : bp < index ? 'above' : 'below'
      }),
      {}
    )
  ];
};
