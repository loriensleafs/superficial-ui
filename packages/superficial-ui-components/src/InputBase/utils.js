export const hasValue = value =>
  value != null && !(Array.isArray(value) && value.length === 0);

export const isDirty = obj =>
  obj &&
  ((hasValue(obj.value) && obj.value !== '') ||
    (hasValue(obj.defaultValue) && obj.defaultValue !== ''));

export const isEmpty = obj => !isDirty(obj);
