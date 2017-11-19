import { Component } from 'react';
import { connect } from 'react-redux';
import { updateScroll } from 'redux-first-router';

class ScrollContext extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      updateScroll();
    }
  }

  render() {
    return this.props.children;
  }
}

export default connect(({ location }) => ({ path: location.pathname }))(ScrollContext);
