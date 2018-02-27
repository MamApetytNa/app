import { join, map, pipe } from 'ramda';

export const addQueryString = (url, queryString) => [url, queryString].join(url.includes('?') ? '&' : '?');

export function getAutoSrcSet(src, maxWidth) {
  if (!src) {
    return '';
  }

  return [3, 2.5, 2, 1.5, 1]
    .map(dpr => [
      addQueryString(src, `fit=min&w=${maxWidth}&h=${maxWidth}&dpr=${dpr}`),
      `${dpr}x`,
    ].join(' '))
    .join(',');
}

const mediaPattern = /@media/;

export function getSizes(sizes) {
  return Object.entries(sizes)
    .map(([cond, size]) => `${cond.replace(mediaPattern, '').trim()} ${size}`)
    .join(',');
}

export const getSrcSetString = pipe(map(join(' ')), join(', '));
