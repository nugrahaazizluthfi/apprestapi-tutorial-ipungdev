'use strict';

module.exports = function (app) {
  let controller = require('./controller');

  app.route('/').get(controller.index);
  app.route('/show-mahasiswa').get(controller.show);
};
