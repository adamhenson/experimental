'use strict';

const path = require('path');

module.exports = function(options) {
  const app = options.app;

  app.get('/react-nojsx/examples/todo',function(req,res){
    const viewsDirectory = path.join(__dirname, '../views');
    res.sendFile(`${viewsDirectory}/react-nojsx/examples/todo/index.html`);
  });
};