const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient

function ValidaBody(titulo, cor) {

  function error(field, min, max) {
    throw new Error(`${field} não pode ser estar vazio, ter menos que ${min} caracteres ou mais que ${max}`)
  }

  if (titulo && titulo.length > 30 || titulo && titulo.length < 3)
    error('Titulo', 3, 30)
  if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(cor)) {
    throw new Error('Cor deve seguir o padrão hex.Exemplo: "#xxx" ou "#xxxxxx"')
  }

}

function validateUpdate(id, titulo, cor) {

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

module.exports = {
  async newCategorias(req, res) {

    let { titulo, cor } = req.body

    try {
      ValidaBody(titulo, cor)

      const categoriaExistente = await prisma.categorias.findUnique({
        where: {
          titulo: titulo
        }
      })
      if (categoriaExistente) {
        return res.status(400).json({ status: 'Categoria já existente' })
      }

      const categoria = await prisma.categorias.create({
        data: {
          titulo: titulo,
          cor: cor
        }
      })
      res.status(201).json({ categoria })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  //dá pra melhorar
  async showCategoriaById(req, res) {
    let { id } = req.params

    try {
      const categoria = await prisma.categorias.findUnique({
        where: {
          id: Number(id)
        }
      })

      if (!categoria) {
        return res.status(400).json({ status: 'id não foi encondro' })
      }
      res.status(200).json({ categoria })

    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async showCategorias(req, res) {
    try {
      const categorias = await prisma.categorias.findMany()
      res.status(200).json({ categorias })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }

  },

  async deleteCategorias(req, res) {
    let { id } = req.params

    try {
      await prisma.categorias.delete({
        where: {
          id: Number(id)
        }
      })
      res.status(200).json({ mensagem: `Video ${id} deletado` })

    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },

  async updateCategorias(req, res) {
    let { id, titulo, cor } = req.body

    try {

      validateUpdate(id, titulo, cor)

      await prisma.categorias.update({
        where: { id: Number(id) },
        data: {
          titulo: titulo,
          cor: cor
        }
      }
      )
      const categoria = await prisma.categorias.findUnique({
        where: { id: Number(id) }
      })
      if (!categoria) {
        return res.status(400).json({ status: 'Categoria não encontrada' })
      }
      res.status(200).json({ categoria })

    } catch (error) {
      return res.status(500).json({ error: error.message })
    }

  },
}