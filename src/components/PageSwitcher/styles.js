export const ANIMATION_DURATION = 500;

function createFromToAnimation(animationName, from, to) {
  return {
    [`@keyframes ${animationName}`]: { from, to },
  };
}

function createSwipeAnimation(type, fromOpacity, toOpacity) {
  return (direction, fromX, toX) => createFromToAnimation(`swipe-${type}-${direction}`, {
    opacity: fromOpacity,
    transform: `translateX(${fromX})`,
  }, {
    opacity: toOpacity,
    transform: `translateX(${toX})`,
  });
}

function createFadeAnimation(type, fromOpacity, toOpacity) {
  return createFromToAnimation(`fade-${type}`, {
    opacity: fromOpacity,
  }, {
    opacity: toOpacity,
  });
}

function createTransitionClass(type, theme) {
  return {
    animation: {
      duration: ANIMATION_DURATION,
      iterationCount: 1,
      fillMode: 'forwards',
    },
    '$backward &': {
      animationName: `swipe-${type}-backward`,
      [theme.breakpoints.up('sm')]: {
        animationName: `fade-${type}`,
        opacity: type === 'in' ? 0 : 1,
      },
    },
    '$forward &': {
      animationName: `swipe-${type}-forward`,
      [theme.breakpoints.up('sm')]: {
        animationName: `fade-${type}`,
        opacity: type === 'in' ? 0 : 1,
      },
    },
  };
}

const createSwipeEnterAnimation = createSwipeAnimation('in', 0, 1);
const createSwipeLeaveAnimation = createSwipeAnimation('out', 1, 0);

export default theme => ({
  ...createSwipeEnterAnimation('forward', '100%', '0'),
  ...createSwipeLeaveAnimation('forward', '0', '-100%'),
  ...createSwipeEnterAnimation('backward', '-100%', '0'),
  ...createSwipeLeaveAnimation('backward', '0', '100%'),
  ...createFadeAnimation('in', 0, 1),
  ...createFadeAnimation('out', 1, 0),
  backward: {},
  forward: {},
  'page-enter': createTransitionClass('in', theme),
  'page-leave': {
    ...createTransitionClass('out', theme),
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      top: 0,
    },
  },
  root: {
    position: 'relative',
    minHeight: '100%',
    display: 'flex',
    width: '200%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      display: 'block',
    },
  },
  page: {
    backgroundColor: theme.palette.background.paper,
    width: '50%',
    marginLeft: 0,
    marginRight: 0,
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
    '&:first-child:not(:last-child)': {
      // entering
      position: 'absolute',
      top: 0,
      opacity: 0,
      zIndex: 1,
    },
    '&:last-child:not(:first-child)': {
      // leaving
      opacity: 1,
      zIndex: 0,
    },
  },
});
