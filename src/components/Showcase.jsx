import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
import React from 'react';
import SwipableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import { pipe } from 'ramda';

import withState from '../utils/with-state';

const styles = {
  image: {
    top: 'auto',
    height: '100%',
    objectFit: 'cover',
    transform: 'none',
    width: '100%',
    position: 'absolute',
  },
  imageWrapper: {
    height: 0,
    paddingBottom: '100%',
    position: 'relative',
  },
};

function Showcase({
  className,
  classes,
  currentImage = 0,
  images = [],
  onImageChange = () => {},
  imageProps = {},
}) {
  return (
    <div className={classNames(className, classes.root)}>
      <SwipableViews
        index={currentImage}
        onChangeIndex={onImageChange}
      >
        {images.map(({
            id,
            title,
            url,
            ...rest
        }, index) => (
          <div className={classes.imageWrapper} key={id}>
            <img
              {...rest}
              {...imageProps}
              alt={title}
              src={url}
              className={classNames(classes.image, {
              [classes.activeImage]: index === currentImage,
            })}
            />
          </div>
      ))}
      </SwipableViews>
      {images.length > 1 && <MobileStepper
        type="dots"
        steps={images.length}
        position="static"
        activeStep={currentImage}
        classes={{ root: classes.stepper }}
        backButton={
          <Button
            size="small"
            onClick={() => onImageChange(currentImage - 1)}
            disabled={currentImage === 0}
          >
            <KeyboardArrowLeft />
          </Button>
      }
        nextButton={
          <Button
            size="small"
            onClick={() => onImageChange(currentImage + 1)}
            disabled={currentImage === images.length - 1}
          >
            <KeyboardArrowRight />
          </Button>
      }
      />}
    </div>
  );
}

export default pipe(
  withState({
    state: {
      currentImage: 0,
    },
    actions: {
      onImageChange: currentImage => ({ currentImage }),
    },
  }),
  withStyles(styles),
)(Showcase);
