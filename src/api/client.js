const API_ROOT = '/api';

function createApiFetch(path, paramsList = []) {
  return async (...params) => {
    const url = paramsList
      .map((name, index) => [name, params[index]])
      .reduce(
        (acc, [name, value]) =>
          acc.replace(`:${name}`, value),
        API_ROOT + path,
      );

    const response = await fetch(url);
    const json = await response.json();

    return json;
  };
}

export const getFeatured = createApiFetch('/featured');

export const getItems = createApiFetch('/cake');

export const getItem = createApiFetch('/cake/:id', ['id']);
