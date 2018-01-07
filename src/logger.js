/* eslint-disable no-underscore-dangle, no-nested-ternary, import/no-extraneous-dependencies */

module.exports = process.env.NODE_ENV === 'development'
  ? (
    process.env.TARGET === 'node'
      ? require('redux-node-logger')()
      : require('redux-logger')
  )
  : () => (a => a);
