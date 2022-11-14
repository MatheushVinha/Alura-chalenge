const usuarioController = require('./UsuarioController')

module.exports = app => {
  app.route('/usuarios')
    .post(usuarioController.newUsuario)
    .get(usuarioController.showUsuarios)
    .put(usuarioController.updateCategoria)

  app.route('/usuarios/:id')
    .get(usuarioController.showUsuarioById)
    .delete(usuarioController.deleteUsuario)

  app.route('/teste')
    .get(usuarioController.teste)
}
