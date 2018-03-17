import { stringify as stringifyQuery } from 'query-string';

const API_ROOT = '/api';

function createApiFetch(path, pathParams = []) {
  return async (...params) => {
    const url = pathParams
      .map((name, index) => [name, params[index]])
      .reduce(
        (acc, [name, value]) =>
          acc.replace(`:${name}`, value),
        API_ROOT + path,
      );

    const queryParams = stringifyQuery(params[pathParams.length]);

    const response = await fetch(`${url}?${queryParams}`);
    const json = await response.json();

    return json;
  };
}

export const getFeatured = createApiFetch('/featured');

export const getItems = createApiFetch('/cake');

export const getItem = createApiFetch('/cake/:id', ['id']);

export const getContactInfo = createApiFetch('/contact');

export const getAboutContent = createApiFetch('/about');
