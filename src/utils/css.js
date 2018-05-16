
function gradientStep([color, position]) {
  return `${color} ${position}`;
}
export function linearGradient(dir, ...steps) {
  return `linear-gradient(${dir}, ${steps.map(gradientStep).join(',')})`;
}

export function rgba(r, g, b, a = 1) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export const rules = {
  unstyledLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
  absoluteFill: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeading: theme => ({
    color: 'inherit',
    fontWeight: 'bold',
    marginBottom: theme.spacing.unit,
  }),
};

