import { config } from './customProps';

const transformProp = (prop, propValue) => {
  const configKeys = Object.keys(config);
  let result = {};

  if (configKeys.includes(prop)) {
    const { properties, property } = config[prop];
    if (properties) {
      properties.forEach(prop => (result[prop] = propValue));
    }
    if (property) {
      result[property] = propValue;
    }
    if (config[prop] === true) {
      result[prop] = propValue;
    }
  } else {
    result[prop] = propValue;
  }
  return result;
};

export const transform = props => {
  let result = null;
  for (let prop in props) {
    if (typeof props[prop] === 'object') {
      result = { ...result, [prop]: transform(props[prop]) };
    } else {
      result = { ...result, ...transformProp(prop, props[prop]) };
    }
  }
  return result;
};

export default transform;
