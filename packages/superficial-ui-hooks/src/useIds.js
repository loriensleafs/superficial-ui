import { useId } from './useId';

const prefix = (str, id) => `${str}-${id}`;

export function useIds(...prefixes) {
  const uuid = useId();
  const ids = prefixes.map(p => prefix(p, uuid));
  return ids;
}

export default useIds;
