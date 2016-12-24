'use strict';

const CPUS = require('os').cpus().length;
const cluster = require('cluster');
const server = require('./http');
const CONFIG = require('../config');
const PORT = CONFIG.environment.httpPort || 8080;

if (cluster.isMaster) {
  console.log('start cluster with %s workers', CPUS);

  // Fork workers.
  for (var i = 0; i < CPUS; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log('worker ' + worker.process.pid + ' died... restarting.');
    cluster.fork();
  });
} else {
  server.listen(PORT, () => { 
    console.log(`${CONFIG.name} listening on ${PORT}.`); 
  });
}

process.on('uncaughtException', (err) => {
  console.error((new Date).toUTCString() + ' uncaughtException: ', err.stack.split("\n"))
  process.exit(1)
});