const categoriasController = require('./categoriasController')
const autorização = require("../auth/bearer")

module.exports = app => {
  app.route('/categorias')
    .post(autorização, categoriasController.newCategorias)
    .get(autorização, categoriasController.showCategorias)
    .put(autorização, categoriasController.updateCategorias)
  app.route('/categorias/:id/')
    .get(autorização, categoriasController.showCategoriaById)
    .delete(autorização, categoriasController.deleteCategorias)
}