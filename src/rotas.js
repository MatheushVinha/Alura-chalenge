const videos = require('./videos')
const categorias = require('./categorias')
const usuario = require('./usuario')

module.exports = app => {
  videos.rotas(app)
  categorias.rotas(app)
  usuario.rotas(app)
}
