const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient
const bcrypt = require('bcrypt')

function validateBody(nome, email, senha) {

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
}

module.exports = {

  async newUsuario(req, res) {
    try {
      const { nome, email, senha } = req.body
      validateBody(nome, email, senha)
      const usuarioEmailExist = await prisma.usuario.findUnique({
        where: {
          email: email
        }
      })

      if (usuarioEmailExist) {
        return res.json({ mensagem: "Email de usuario já existe" })
      }

      const senhaHash = await bcrypt.hash(senha, 12)

      const usuario = await prisma.usuario.create({
        data: {
          nome: nome,
          email: email,
          senha: senhaHash
        }
      })
      res.json({ usuario })

    } catch (error) {
      res.status(500).json({ erro: error.message })
    }
  },

  async showUsuarioById(req, res) {

    try {
      const { id } = req.params

      const usuario = await prisma.usuario.findUnique({
        where: {
          id: Number(id)
        }
      })

      if (!usuario) {
        return res.status(400).json({ mensagem: "Usuario não encontrado" })
      }
      res.status(200).json({ usuario })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }

  },

  async showUsuarios(req, res) {
    const user = await prisma.usuario.findMany()

    res.json(user)


  }


}