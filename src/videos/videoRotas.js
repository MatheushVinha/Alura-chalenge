const videosController = require('./videosController')
const autorização = require("../auth/bearer")


module.exports = app => {
  app.route('/videos')
    .get(autorização, videosController.showVideos)
    .post(autorização, videosController.newVideo)
  app.route('/videos/:id')
    .get(autorização, videosController.showVideosByid)
    .delete(autorização, videosController.deleteVideos)
  app.route('/patch')
    .put(autorização, videosController.updateVideos)
  app.route('/categorias/:id/videos/')
    .get(autorização, videosController.showVideoByCategoria)
}