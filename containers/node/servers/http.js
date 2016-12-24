'use strict';

// express
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
// config files
const CONFIG = require('../config');
const APP_PACKAGE = require('../package.json');
// middleware
const Modulizer = require('modulizer');
const errorHandler = require('errorhandler');

if (CONFIG.environment.control === 'dev') app.use(errorHandler());

// routes / controllers
let routeDirectory = new Modulizer(path.join(__dirname, '../routes'), {
  'app' : app
});
routeDirectory.executeAll();

app.use('/static', express.static('static'));

module.exports = server;