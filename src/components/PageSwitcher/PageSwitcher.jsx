import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Transition, TransitionGroup } from 'transition-group';

import styles, { ANIMATION_DURATION } from './styles';

function PageSwitcher({
  pageComponent: Page,
  className,
  classes,
  direction,
  page,
  transitionType,
  ...props
}) {
  return (
    <TransitionGroup
      component="div"
      className={classNames(classes.root, className, classes[direction])}
      enterDuration={ANIMATION_DURATION}
      leaveDuration={ANIMATION_DURATION}
    >
      <Transition
        key={page}
        enter={classes['page-enter']}
        leave={classes['page-leave']}
      >
        <Page className={classes.page} page={page} {...props} />
      </Transition>
    </TransitionGroup>
  );
}

export default withStyles(styles)(PageSwitcher);
