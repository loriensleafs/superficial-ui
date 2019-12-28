import { useUID } from 'react-uid';

export const useId = (prefix, idProp) => {
  const uuid = useUID();
  const id = idProp || uuid;
  return prefix ? `${prefix}-${id}` : id;
};
