const videosController = require('./videosController')

module.exports = app => {
  app.route('/videos')
    .get(videosController.showVideos)
    .post(videosController.newVideo)
  app.route('/videos/:id')
    .get(videosController.showVideosByid)
    .delete(videosController.deleteVideos)
  app.route('/patch')
    .put(videosController.updateVideos)
  app.route('/categorias/:id/videos/')
    .get(videosController.showVideoByCategoria)
}