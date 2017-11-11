import React, { Component } from 'react';

import { mapObjIndexed } from 'ramda';

export default ({ state, actions }) => WrappedComponent => class WithState extends Component {
    state = state

    actions = mapObjIndexed(action => (payload) => {
      const newState = action(payload, this.state);
      this.setState(newState);
    }, actions)

    render() {
      return <WrappedComponent {...this.props} {...this.actions} {...this.state} />;
    }
};

