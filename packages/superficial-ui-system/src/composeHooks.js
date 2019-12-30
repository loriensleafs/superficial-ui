export const composeHooks = (hook1, hook2) => props => {
  let out1 = hook1(props);
  let out2 = hook2(out1);
  return out2;
};
