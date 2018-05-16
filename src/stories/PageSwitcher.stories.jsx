import React, { Component } from 'react';

import { storiesOf } from '@storybook/react';

import PageSwitcher from '../components/PageSwitcher/PageSwitcher';

import jssProvider from './JssProvider.stories';

function Page({ className, page }) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: ['red', 'green', 'blue'][page],
        color: 'white',
        textAlign: 'center',
        lineHeight: '100vh',
        height: '100vh',
      }}
    >Page {page}
    </div>
  );
}

class Wrapper extends Component {
    state = {
      direction: null,
      page: 0,
    }

    handlePrev = () => this.setState(({ page }) => ({
      direction: 'backward',
      page: page === 0 ? 2 : page - 1,
    }))

    handleNext = () => this.setState(({ page }) => ({
      direction: 'forward',
      page: page === 2 ? 0 : page + 1,
    }))

    render() {
      return [
        <div
          key="ui"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
        >
          <button onClick={this.handlePrev}>{'<<'}</button>
          <button onClick={this.handleNext}>{'>>'}</button>
        </div>,
        <PageSwitcher
          key="switcher"
          direction={this.state.direction}
          pageComponent={Page}
          page={this.state.page}
        />,
      ];
    }
}

storiesOf('PageSwitcher', module)
  .addDecorator(getStory => jssProvider(getStory()))
  .add('default', () => (<Wrapper />));
