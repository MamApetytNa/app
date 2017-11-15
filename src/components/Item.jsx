import React from 'react';

import ItemIntro from './ItemIntro';
import ItemDetails from './ItemDetails';

export default function Item(props) {
  return (
    <div>
      <ItemIntro {...props} />
      <ItemDetails {...props} />
    </div>
  );
}
