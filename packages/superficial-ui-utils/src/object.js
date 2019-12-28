import { toArray } from './array';

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

export const has = (object, key) => Boolean(get(key, object));

export const mapObject = (...args) => {
  const cb = (object, predicate) => {
    const result = {};
    for (const key in object)
      set(result, key, predicate(key, object[key], object));
    return result;
  };
  return args.length === 1
    ? object => cb(object, args[0])
    : cb(args[0], args[1]);
};

export const filterObject = (...args) => {
  const cb = (object, predicate) => {
    const result = {};
    for (const key in object) {
      if (predicate(key, object[key], object)) set(result, key, object[key]);
    }
    return result;
  };
  return args.length === 1
    ? object => cb(object, args[0])
    : cb(args[0], args[1]);
};

export const pick = (...args) => {
  const cb = (object, keys) => {
    keys = toArray(keys);
    const result = {};
    for (let i = 0; i < keys.length; i++) {
      if (has(object, keys[i])) set(result, keys[i], get(object, keys[i]));
    }
    return result;
  };
  return args.length === 1
    ? object => cb(object, args[0])
    : cb(args[0], args[1]);
};

export const omit = (...args) => {
  const cb = (object, keys) => {
    keys = toArray(keys);
    const result = {};
    for (key in object) {
      if (!keys.includes(key)) set(result, key, object[key]);
    }
    return result;
  };
  return args.length === 1
    ? object => cb(object, args[0])
    : cb(args[0], args[1]);
};

export const split = (...args) => {
  const cb = (object, keys) => {
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
  };
  return args.length === 1
    ? object => cb(object, args[0])
    : cb(args[0], args[1]);
};
