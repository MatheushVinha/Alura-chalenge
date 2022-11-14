module.exports = {
  
  validateBody(nome, email, senha) {

    function error(field, min, max) {
      throw new Error(`${field} não pode ser estar vazio, ter menos que ${min} caracteres ou mais que ${max}`)
    }

    if (!nome || nome.length > 30 || nome.length < 5)
      error('nome', 3, 100)
    if (!email || email.length > 250 || email.length < 5)
      error('Email', 5, 250)
    if (!senha || senha.length > 150 || senha.length < 5)
      error('Senha', 6, 15)
    if (!/^(?=.*[0-9])(?=.*[a-z]).{6,15}$/i.test(senha)) {
      throw new Error('Senha tem que conter uma letra')
    }
  },

  validateUpdate(nome, email, senha) {

    function error(field, min, max) {
      throw new Error(`${field} não pode ser estar vazio, ter menos que ${min} caracteres ou mais que ${max}`)
    }

    if (nome && nome.length > 30 || nome && nome.length < 5)
      error('nome', 3, 100)
    if (email && email.length > 350 || email && email.length < 5)
      error('email', 5, 250)
    if (senha && senha.length > 150 || senha && senha.length < 5)
      error('senha', 6, 15)
    if (senha && !/^(?=.*[0-9])(?=.*[a-z]).{6,15}$/i.test(senha)) {
      throw new Error('Senha tem que conter uma letra')

    }
  }



}