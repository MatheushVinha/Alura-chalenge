const categoriasController = require('./categoriasController')

module.exports = app => {
  app.route('/categorias')
    .post(categoriasController.newCategorias)
    .get(categoriasController.showCategorias)
    .put(categoriasController.updateCategorias)
  app.route('/categorias/:id/')
    .get(categoriasController.showCategoriaById)
    .delete(categoriasController.deleteCategorias)
}