import Typography from 'material-ui/Typography';
import React from 'react';
import Link from 'redux-first-router-link';

import { goToItemList } from '../actions';

const texts = {
  ITEM_LIST: 'Zobacz ciasta!',
};

export default function Home() {
  return (
    <Typography component="p">
      <Link to={goToItemList()}>{texts.ITEM_LIST}</Link>
    </Typography>
  );
}
