export const ANIMATION_DURATION = 500;

function createFromToAnimation(animationName, from, to) {
  return {
    [`@keyframes ${animationName}`]: {
      from,
      to,
    },
  };
}

function createSwipeAnimation(type, fromOpacity, toOpacity) {
  return (direction, fromX, toX) => createFromToAnimation(`page-${type}-swipe-${direction}`, {
    opacity: fromOpacity,
    transform: `translateX(${fromX})`,
  }, {
    opacity: toOpacity,
    transform: `translateX(${toX})`,
  });
}

function createFadeAnimation(type, fromOpacity, toOpacity) {
  return createFromToAnimation(`page-${type}-fade`, {
    opacity: fromOpacity,
  }, {
    opacity: toOpacity,
  });
}

function createRuleWithAnimation(animationName) {
  return {
    animation: {
      name: animationName,
      duration: ANIMATION_DURATION,
      iterationCount: 1,
    },
  };
}

function createTransitionDirectedProps(type, direction) {
  return {
    [`$${direction} &`]: createRuleWithAnimation(`page-${type}-${direction}`),
  };
}

function createUndirectedTransitionStyle(type) {
  return {
    [`page-${type}`]: createRuleWithAnimation(`page-${type}`),
  };
}

function createDirectedTransitionStyle(type) {
  return {
    [`page-${type}`]: {
      ...createTransitionDirectedProps(type, 'back'),
      ...createTransitionDirectedProps(type, 'forward'),
    },
  };
}

const createSwipeEnterAnimation = createSwipeAnimation('enter', 0, 1);
const createSwipeLeaveAnimation = createSwipeAnimation('leave', 1, 0);

export default theme => ({
  ...createSwipeEnterAnimation('forward', '100%', '0'),
  ...createSwipeLeaveAnimation('forward', '-100%', '-200%'),
  ...createSwipeEnterAnimation('back', '-100%', '0'),
  ...createSwipeLeaveAnimation('back', '-100%', '0'),
  ...createFadeAnimation('enter', 0, 1),
  ...createFadeAnimation('leave', 1, 0),
  ...createDirectedTransitionStyle('enter-swipe'),
  ...createDirectedTransitionStyle('leave-swipe'),
  ...createUndirectedTransitionStyle('enter-fade'),
  ...createUndirectedTransitionStyle('leave-fade'),
  back: {},
  forward: {},
  root: {
    position: 'relative',
    minHeight: '100%',
    display: 'flex',
    width: `calc(200% + ${theme.spacing.unit * 4}px)`,
  },
  page: {
    width: '50%',
    marginLeft: 0,
    marginRight: 0,
  },
});
