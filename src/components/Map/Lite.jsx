import classNames from 'classnames';
import React from 'react';
import { stringify } from 'query-string';
import { withStyles } from 'material-ui/styles';
import { getSrcSetString } from '../../utils/pic';

const KEY = 'AIzaSyB7DdWEzPniEhyzxD8iCeaf0itsnqXC3jI';
const API_URL = 'https://maps.googleapis.com/maps/api/staticmap';
const params = {
  markers: 'Olga+ma+Wypieki,Gorna+Wilda+96,Poznan',
  key: KEY,
  zoom: 15,
};
const URL = `${API_URL}?${stringify(params)}`;
const FULL_MAP_URL = 'https://www.google.com/maps/place/data=!3m1!4b1!4m5!3m4!1s0x47045b2461665227:0x9558b18228d8ad1a!8m2!3d52.394712!4d16.922746';

function getMapSizes(mapper, widths, dprs) {
  return dprs
    .reduce((acc, dpr) => [
      ...acc,
      ...widths.map(width => [mapper(width, dpr), width * dpr]),
    ], [])
    .sort(([, a], [, b]) => a - b)
    .map(([url, width]) => [url, `${width}w`]);
}

const styles = {
  root: {
    border: 0,
  },
};

function LiteMap({ className, classes }) {
  const sizes = getMapSizes(
    (size, dpr) => `${URL}&size=${size}x${size}&scale=${dpr}`,
    [320, 360, 375, 414, 568, 600],
    [1, 2],
  );

  return (
    <a
      className={classNames(className, classes.root)}
      href={FULL_MAP_URL}
      target="_blank"
    >
      <img
        alt="A map"
        src={sizes[0]}
        srcSet={getSrcSetString(sizes)}
        sizes="100vw"
      />
    </a>
  );
}

export default withStyles(styles)(LiteMap);
