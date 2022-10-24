const videos = require('./videos')

module.exports = app => {
  videos.rotas(app)
}