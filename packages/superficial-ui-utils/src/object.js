import { toArray } from './array';

export { default as merge } from 'lodash.merge';

export const has = (object, key) => Boolean(get(key, object));

export const get = (obj, key, def, p, undef) => {
  key = key && key.split ? key.split('.') : [key];
  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }
  return obj === undef ? def : obj;
};

export const set = (object, key, value, p, undef) => {
  key = key && key.split ? key.split('.') : key;
  for (p = 0; p < key.length; p++) {
    object = object[key[p]] =
      p === key.length - 1
        ? value
        : object[key[p]] != null
        ? object[key[p]]
        : !!~key[p + 1].indexOf('.') || !(+key[p + 1] > -1)
        ? {}
        : [];
  }
};

export const getProps = test => props => {
  const next = {};
  for (const key in props) {
    if (test(key || '')) next[key] = props[key];
  }
  return next;
};

export function mapObject(...args) {
  function _map(object, predicate) {
    const result = {};
    for (const key in object)
      set(result, key, predicate(key, object[key], object));
    return result;
  }

  return args.length === 1
    ? object => _map(object, args[0])
    : _map(args[0], args[1]);
}

export function filterObject(...args) {
  function _filter(object, predicate) {
    const result = {};
    for (const key in object) {
      if (predicate(key, object[key], object)) set(result, key, object[key]);
    }
    return result;
  }

  return args.length === 1
    ? object => _filter(object, args[0])
    : _filter(args[0], args[1]);
}

export function pick(...args) {
  function _pick(object, keys) {
    keys = toArray(keys);
    const result = {};
    for (let i = 0; i < keys.length; i++) {
      if (has(object, keys[i])) set(result, keys[i], get(object, keys[i]));
    }
    return result;
  }

  return args.length === 1
    ? object => _pick(object, args[0])
    : _pick(args[0], args[1]);
}

export function omit(...args) {
  function _omit(object, keys) {
    keys = toArray(keys);
    const result = {};
    for (key in object) {
      if (!keys.includes(key)) set(result, key, object[key]);
    }
    return result;
  }

  return args.length === 1
    ? object => _omit(object, args[0])
    : _omit(args[0], args[1]);
}

export function split(...args) {
  function _split(object, keys) {
    const picked = {};
    const omitted = {};
    for (const key in object) {
      if (keys.includes(key)) {
        picked[key] = object[key];
      } else {
        omitted[key] = object[key];
      }
    }
    return [picked, omitted];
  }

  return args.length === 1
    ? object => _split(object, args[0])
    : _split(args[0], args[1]);
}
