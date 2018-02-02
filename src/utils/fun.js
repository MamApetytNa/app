import { curryN } from 'ramda';

export function noop() {}

export const updateProp = curryN(3, (updater, prop, obj) => {
  if (!(prop in obj)) {
    return obj;
  }

  return {
    ...obj,
    [prop]: updater(obj[prop]),
  };
});


export const getFrom = curryN(2, (obj, prop) => obj && obj[prop]);
