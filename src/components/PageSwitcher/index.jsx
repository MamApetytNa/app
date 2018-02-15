import { pick, pipe } from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import universal from 'react-universal-component';
import { withProps } from 'recompose';

import Loader from '../Loader';

import PageSwitcher from './PageSwitcher';

const Page = universal(({ page, pages }) => import(`../../pages/${pages[page]}`), {
  loading: Loader,
});

function PageWrapper({ className, ...props }) {
  return (<div className={className}><Page {...props} /></div>);
}

export default pipe(
  connect(pick(['page', 'direction'])),
  withProps({ pageComponent: PageWrapper }),
)(PageSwitcher);
