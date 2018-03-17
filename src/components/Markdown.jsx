import React from 'react';
import Typography from 'material-ui/Typography';

import { createRenderer } from '../utils/markdown';

const render = createRenderer({
  heading({ key, children, depth }) {
    const variant = ({
      1: 'headline',
      2: 'title',
      3: 'subheading',
    })[depth] || 'subheading';
    return <Typography variant={variant} key={key}>{children}</Typography>;
  },
  paragraph({ key, children }) {
    return <Typography variant="body1" key={key}>{children}</Typography>;
  },
});

export default function Markdown({ className, ast }) {
  return <div className={className}>{render(ast)}</div>;
}
