import React from 'react';

import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Select from 'material-ui/Select';
import Typography from 'material-ui/Typography';

import { withStyles } from 'material-ui/styles';
import { path, pipe } from 'ramda';

import withState from '../utils/with-state';

import Price from './Price';

const styles = {

};

const texts = {
  DIAMETER: 'ø',
  FOR_ONE_SLICE: '🍰',
  SIZE: 'Rozmiar',
  SLICES: 'kawałków',
  WEIGHT: '⚖',
};

const getSelectValue = path(['target', 'value']);

function SizeChooser({
  classes,
  currentSizeIndex = 0,
  onSizeChange = () => {},
  sizes = [],
}) {
  const currentSize = sizes[currentSizeIndex];
  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="size">{texts.SIZE}</InputLabel>
          <Select
            native
            value={currentSizeIndex}
            onChange={pipe(getSelectValue, onSizeChange)}
            input={<Input id="size" />}
          >{sizes.map(({ slices }, index) => (
            <option value={index} key={slices}>{slices} {texts.SLICES}</option>
            ))}
          </Select>
        </FormControl>
        <Grid container>
          <Grid item xs={6}>
            <Typography component="p">
              {texts.DIAMETER}
                &nbsp;
              {currentSize.diameter.value}
                &nbsp;
              {currentSize.diameter.unit}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="p">
              {texts.WEIGHT}
                &nbsp;
              {currentSize.weight.value}
                &nbsp;
              {currentSize.weight.unit}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Price
          {...currentSize.price}
          accent
          align="center"
          prefix=""
          type="headline"
        />
        <Price
          align="center"
          color="secondary"
          currency={currentSize.price.currency}
          prefix={texts.FOR_ONE_SLICE}
          type="subheading"
          value={currentSize.price.value / currentSize.slices}
        />
      </Grid>
    </Grid>
  );
}

export default pipe(
  withState({
    state: {
      currentSizeIndex: 0,
    },
    actions: {
      onSizeChange: currentSizeIndex => ({ currentSizeIndex }),
    },
  }),
  withStyles(styles),
)(SizeChooser);
