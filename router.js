'use strict';

module.exports = function (app) {
  let controller = require('./controller');

  app.route('/').get(controller.index);
  app.route('/mahasiswa').get(controller.show);
  app.route('/mahasiswa/:id').get(controller.showById);
  app.route('/mahasiswa').post(controller.insert);
  app.route('/mahasiswa/:id').put(controller.update);
  app.route('/mahasiswa/:id').delete(controller.delete);
  app.route('/nested').get(controller.nested);
};
