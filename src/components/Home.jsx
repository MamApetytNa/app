import React from 'react';
import Typography from 'material-ui/Typography';

import Link from 'redux-first-router-link';

const texts = {
  ITEM_LIST: 'Zobacz ciasta!',
};

export default function Home() {
  return (
    <Typography component="p">
      <Link to={{ type: 'ITEM_LIST' }}>{texts.ITEM_LIST}</Link>
    </Typography>
  );
}
