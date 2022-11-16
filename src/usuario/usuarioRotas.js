const usuarioController = require('./UsuarioController')
const autorização = require("../auth/bearer")

module.exports = app => {
  app.route('/usuarios')
    .post(autorização, usuarioController.newUsuario)
    .get(autorização, usuarioController.showUsuarios)
    .put(autorização, usuarioController.updateCategoria)

  app.route('/usuarios/login')
    .get(usuarioController.authLogin)

  app.route('/usuarios/:id')
    .get(autorização, usuarioController.showUsuarioById)
    .delete(autorização, usuarioController.deleteUsuario)

}
