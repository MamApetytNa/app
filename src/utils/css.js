
function gradientStep([color, position]) {
  return `${color} ${position}`;
}
export function linearGradient(dir, ...steps) {
  return `linear-gradient(${dir}, ${steps.map(gradientStep).join(',')})`;
}

export function rgba(r, g, b, a = 1) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
