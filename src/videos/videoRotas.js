const videosController = require('./videosController')

module.exports = app => {
  app.route('/videos')
    .post(videosController.newVideo)
  app.route('/videos/:id')
    .get(videosController.showVideosByid)
  app.route('/videos')
    .get(videosController.showVideos)
  app.route('/videos/:id')
    .delete(videosController.deleteVideos)
  app.route('/patch')
    .put(videosController.updateVideos)
}