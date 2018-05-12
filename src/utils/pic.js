import { join, map, pipe } from 'ramda';

const PROVIDER_PREFIX = 'https://res.cloudinary.com/olgamawypieki/image/upload';

export const addQueryString = (url, queryString) => [url, queryString].join(url.includes('?') ? '&' : '?');

function renderParams(params = {}) {
  return Object.entries(params).map(([key, value]) => {
    if (key === 'ar') {
      return [
        ['ar', value],
        ['c', 'thumb'],
      ];
    }

    if (key === 'fp' && (Object.keys(value).length > 0)) {
      return [
        ['g', 'xy_center'],
        'x' in value ? ['x', `w_mul_${value.x}`] : null,
        'y' in value ? ['y', `h_mul_${value.y}`] : null,
      ].filter(Boolean);
    }

    return [
      [key, value],
    ];
  })
    .reduce((a, b) => a.concat(b), [])
    .map(([key, value]) => [key, value].join('_'))
    .join(',');
}

export const getPhotoUrl = (photo, variant, customParams) => {
  const { name, [variant]: variantParams } = photo;

  return [
    PROVIDER_PREFIX,
    renderParams({
      f: 'auto',
      q: 'auto',
    }),
    renderParams(customParams),
    renderParams(variantParams),
    name,
  ].join('/');
};

export function getAutoSrcSet(photo, variant, maxWidth) {
  return [3, 2.5, 2, 1.5, 1]
    .map(dpr => [
      getPhotoUrl(photo, variant, { w: `auto:1:${maxWidth}`, dpr }),
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
