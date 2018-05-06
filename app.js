const path = require('path');

process.env.TARGET = 'node';
process.env.DATA_DIR = path.join(__dirname, 'data');
process.env.SERVER_PATH = path.join(__dirname, 'server.js');

require('./scripts/start.js');
