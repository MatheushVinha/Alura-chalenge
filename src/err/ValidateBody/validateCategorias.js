module.exports = {

  ValidaBody(titulo, cor) {

    function error(field, min, max) {
      throw new Error(`${field} não pode ser estar vazio, ter menos que ${min} caracteres ou mais que ${max}`)
    }

    if (titulo && titulo.length > 30 || titulo && titulo.length < 3)
      error('Titulo', 3, 30)
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(cor)) {
      throw new Error('Cor deve seguir o padrão hex.Exemplo: "#xxx" ou "#xxxxxx"')
    }

  },

  validateUpdate(id, titulo, cor) {

    function error(field, min, max) {
      throw new Error(`${field} não pode ser estar vazio, ter menos que ${min} caracteres ou mais que ${max}`)
    }
    if (titulo && titulo.length > 30 || titulo && titulo.length < 5)
      error('titulo', 5, 30)
    if (!id)
      throw new Error('Id não pode está vazio')
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(cor)) {
      throw new Error('Cor deve seguir o padrão hex.Exemplo: "#xxx" ou "#xxxxxx"')
    }
  }
}