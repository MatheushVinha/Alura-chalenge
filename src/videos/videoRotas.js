const videosController = require('./videosController')

module.exports = app => {
  app.route('/criar')
     .post(videosController.newVideo)
}