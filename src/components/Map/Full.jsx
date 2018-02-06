import classNames from 'classnames';
import React from 'react';
import { stringify } from 'query-string';
import { withStyles } from 'material-ui/styles';

const SITE_URL = 'https://beta.olgamawypieki.pl';
const API_URL = 'https://www.google.com/maps/embed/v1/place';
const PLACE_ID = 'ChIJJ1JmYSRbBEcRGq3YKIKxWJU';
const KEY = 'AIzaSyAvc4_LYPwo68koSTSR-EMrRnJEFL6MsC4';
const params = {
  q: `place_id:${PLACE_ID}`,
  key: KEY,
  attribution_source: SITE_URL,
};
const URL = `${API_URL}?${stringify(params)}`;

const styles = {
  root: {
    border: 0,
    width: '100vw',
    height: '100vw',
    maxHeight: 400,
  },
};

function Map({ className, classes }) {
  return (
    <iframe
      className={classNames(className, classes.root)}
      title="A map"
      frameBorder="0"
      src={URL}
      allowFullScreen
    />
  );
}

export default withStyles(styles)(Map);
