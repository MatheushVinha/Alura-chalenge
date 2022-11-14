module.exports = {

  validateBody(titulo, descricao, url) {

    function error(field, min, max) {
      throw new Error(`${field} não pode ser estar vazio, ter menos que ${min} caracteres ou mais que ${max}`)
    }

    if (!titulo || titulo.length > 30 || titulo.length < 5)
      error('titulo', 5, 30)
    if (!descricao || descricao.length > 250 || descricao.length < 5)
      error('descricao', 5, 250)
    if (!url || url.length > 150 || url.length < 5)
      error('url', 5, 150)
  },

  validateUpdate(titulo, descricao, url) {

    function error(field, min, max) {
      throw new Error(`${field} não pode ser estar vazio, ter menos que ${min} caracteres ou mais que ${max}`)
    }

    if (titulo && titulo.length > 30 || titulo && titulo.length < 5)
      error('titulo', 5, 30)
    if (descricao && descricao.length > 350 || descricao && descricao.length < 5)
      error('descricao', 5, 350)
    if (url && url.length > 150 || url && url.length < 5)
      error('url', 5, 150)
  }
}