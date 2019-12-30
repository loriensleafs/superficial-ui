import { useUID } from 'react-uid';

export function useId(prefix, idProp) {
  const uuid = useUID();
  const id = idProp || uuid;
  return prefix ? `${prefix}-${id}` : id;
}

export default useId;
