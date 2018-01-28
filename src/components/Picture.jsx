import React from 'react';

export function getSrcSet(src, maxWidth) {
  if (!src) {
    return '';
  }

  const paramsSeparator = src.includes('?') ? '&' : '?';
  return [3, 2.5, 2, 1.5, 1]
    .map(dpr => `${src}${paramsSeparator}w=${maxWidth}&h=${maxWidth}&dpr=${dpr} ${dpr}x`)
    .join(',');
}

const mediaPattern = /@media/;

export function getSizes(sizes) {
  return Object.entries(sizes)
    .map(([cond, size]) => `${cond.replace(mediaPattern, '').trim()} ${size}`)
    .join(',');
}

export default function Picture({
  alt,
  src = '',
  srcSet = {},
  sizes = {},
  ...rest
}) {
  return (
    <img
      {...rest}
      alt={alt}
      sizes={getSizes(sizes)}
      srcSet={getSrcSet(src, srcSet)}
      src={src}
    />
  );
}
