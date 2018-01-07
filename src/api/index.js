if (process.env.TARGET === 'node') {
  // eslint-disable-next-line global-require
  module.exports = require('../data');
}

if (process.env.TARGET === 'web') {
  // eslint-disable-next-line global-require
  module.exports = require('./client');
}
