const usuarioController = require('./UsuarioController')

module.exports = app => {
  app.route('/usuarios')
    .post(usuarioController.newUsuario)
    .get(usuarioController.showUsuarios)
  app.route('/usuarios/:id')
    .get(usuarioController.showUsuarioById)

}
