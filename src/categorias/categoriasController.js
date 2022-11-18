const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient
const MiniSearch = require('minisearch')
const { ValidaBody, validateUpdate } = require('../err/ValidateBody/validateCategorias')

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
          id: id
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

    const { search, page } = req.query

    //query
    try {
      if (search) {
        if (Array.isArray(search)) {
          return res.status(400).json({ erro: 'Serch só pode receber uma propriedade' })
        }

        let minisearch = new MiniSearch({
          fields: ['titulo'],
          storageFields: ['id'],
          searchOptions: {
            fuzzy: 0.2,
            prefix: true
          },
          tokenize: (string, _fieldName) => string.split('+')
        })

        const categoriaBase = await prisma.categorias.findMany({})

        minisearch.addAll(categoriaBase)
        let results = minisearch.search(decodeURIComponent(search)).map(resultado => resultado.id).slice(0, 5)
        let resultsSearch = categoriaBase.filter(video => results.some(result => video.id == result))
        return res.status(200).json({ resultsSearch })

      }
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }

    //page limiter
    //TODO: Documentar
    try {
      if (page) {

        const categoriaBase = await prisma.categorias.findMany()
        const numberPages = Math.ceil(categoriaBase.length / 5)

        if (page > numberPages) {
          return res.status(400).json({ mensagem: "Pagina não encontrada" })
        }
        const amountCategoriasInPage = 5

        let pagina = Number(page)

        if (!pagina) {
          pagina = 1
        } else {
          pagina = pagina
        }

        let inicialLine = pagina - 1
        let start = inicialLine * amountCategoriasInPage

        const CategoriasDaPagina = await prisma.categorias.findMany({
          skip: start,
          take: 5
        })

        return res.json({ CategoriasDaPagina })

      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }

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
          id: id
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
        where: { id: id },
        data: {
          titulo: titulo,
          cor: cor
        }
      }
      )
      const categoria = await prisma.categorias.findUnique({
        where: { id: id }
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