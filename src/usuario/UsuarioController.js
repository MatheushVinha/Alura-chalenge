const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validateBody, validateUpdate } = require('../err/ValidateBody/validateUsuario')

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
          senha: senha
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
    try {
      const usuario = await prisma.usuario.findMany()
      res.status(200).json({ usuario })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }

  },

  async deleteUsuario(req, res) {

    const { id } = req.params

    try {

      const usuario = await prisma.usuario.findUnique({
        where: { id: Number(id) }
      })
      if (!usuario) {
        return res.status(403).json({ error: "Usuario não encontrado" })
      }

      await prisma.usuario.delete({
        where: { id: Number(id) }
      })

      res.status(202).json({ mensagem: `Usuario ${id} deletado` })


    } catch (error) {
      return res.status(500).json({ error: error.message })
    }


  },

  async updateCategoria(req, res) {
    const { id, nome, email, senha } = req.body

    try {

      validateUpdate(nome, email, senha)

      let novaSenha = ''

      if (!senha) {
        novaSenha = senha
      } else {
        const senhaHash = await bcrypt.hash(senha, 12)
        novaSenha = senhaHash
      }

      const updateUsuario = await prisma.usuario.update({
        where: { id: Number(id) }
        , data: {
          nome: nome,
          email: email,
          senha: novaSenha
        }
      })

      return res.json({ novaSenha })

      const usuario = await prisma.usuario.findUnique({
        where: { id: Number(id) }
      })
      if (!usuario) {
        return res.status(500).json({ error: "Usuario não encontrado" })
      }

      res.status(202).json(usuario)

    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },

  async teste(req, res) {
    const { nome } = req.body

    const json = jwt.sign({ nome }, "supersecretPassworld")
    const desegredo = jwt.decode(json)
    const comparação = jwt.verify(json, "supersecretPassworld", (err) => {
      if (err) {
        return res.json({ m: 'erro' })
      }
    })

    res.json({ json, desegredo, comparação })


  }


}