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
    },
    '$back &': {
      animationName: `swipe-${type}-back`,
      [theme.breakpoints.up('sm')]: {
        animationName: `fade-${type}`,
      },
    },
    '$forward &': {
      animationName: `swipe-${type}-forward`,
      [theme.breakpoints.up('sm')]: {
        animationName: `fade-${type}`,
      },
    },
  };
}

const createSwipeEnterAnimation = createSwipeAnimation('in', 0, 1);
const createSwipeLeaveAnimation = createSwipeAnimation('out', 1, 0);

export default theme => ({
  ...createSwipeEnterAnimation('forward', '100%', '0'),
  ...createSwipeLeaveAnimation('forward', '-100%', '-200%'),
  ...createSwipeEnterAnimation('back', '-100%', '0'),
  ...createSwipeLeaveAnimation('back', '-100%', '0'),
  ...createFadeAnimation('in', 0, 1),
  ...createFadeAnimation('out', 1, 0),
  back: {},
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
    width: `calc(200% + ${theme.spacing.unit * 4}px)`,
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      display: 'block',
    },
  },
  page: {
    width: '50%',
    marginLeft: 0,
    marginRight: 0,
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
});
