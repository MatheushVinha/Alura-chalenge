const videos = require('./videos')
const categorias = require('./categorias')

module.exports = app => {
  videos.rotas(app)
  categorias.rotas(app)
}