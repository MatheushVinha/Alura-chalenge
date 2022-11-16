const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient
const MiniSearch = require('minisearch')
const { validateBody, validateUpdate} = require('../err/ValidateBody/validateVideos')

module.exports = {

  async newVideo(req, res) {
    let { titulo, descricao, url, categoria_id } = req.body

    if (!categoria_id) {
      categoria_id = 1
    }
    const categoria = await prisma.categorias.findUnique({ where: { id: categoria_id } })
    if (!categoria) {
      res.status(401).json({ mensagem: 'Categoria não encontrada' })
    }

    try {
      validateBody(titulo, descricao, url)
      const video = await prisma.videos.create({
        data: {
          titulo: titulo,
          descricao: descricao,
          url: url,
          categorias: {
            connect: { id: categoria_id }
          }
        }
      })
      res.status(200).json({ video })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }

  },

  async showVideosByid(req, res) {
    const { id } = req.params

    try {
      const video = await prisma.videos.findUnique({
        where: { id: Number(id) }
      })
      if (!video) {
        return res.status(400).json({ mensagem: "Video não encontrado" })
      }
      res.status(200).json({ video })

    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async showVideos(req, res) {
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

        const videosBase = await prisma.videos.findMany({})

        minisearch.addAll(videosBase)
        let results = minisearch.search(decodeURIComponent(search)).map(resultado => resultado.id).slice(0, 5)
        let resultsSearch = videosBase.filter(video => results.some(result => video.id == result))
        return res.status(200).json({ resultsSearch })


      }
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }

    //page limiter
    //TODO: Documentar
    try {
      if (page) {
        
        const videosBase = await prisma.videos.findMany()
        const numberPages = Math.ceil(videosBase.length / 5)

        if (page > numberPages) {
          return res.status(400).json({ mensagem: "Pagina não encontrada" })
        }
        const amountVideosInPage = 5

        let pagina = Number(page)

        if (!pagina) {
          pagina = 1
        } else {
          pagina = pagina
        }

        let inicialLine = pagina - 1
        let start = inicialLine * amountVideosInPage

        const videoDaPagina = await prisma.videos.findMany({
          skip: start,
          take: 5
        })

        return res.json({ videoDaPagina })


      }
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }


    //All videos
    try {
      const videos = await prisma.videos.findMany()
      res.status(200).json({ videos })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },

  async deleteVideos(req, res) {

    const { id } = req.params
    try {

      const video = await prisma.videos.findUnique({
        where: { id: Number(id) }
      })
      if (!video) {
        return res.status(403).json({ error: "Video não encontrado" })
      }

      await prisma.videos.delete({
        where: { id: Number(id) }
      })

      res.status(202).json({ mensagem: `Video ${id} deletado` })

    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },

  async updateVideos(req, res) {
    const { id, titulo, descricao, url } = req.body

    try {

      validateUpdate(titulo, descricao, url)

      const updateVideo = await prisma.videos.update({
        where: { id: Number(id) }
        , data: {
          titulo: titulo,
          descricao: descricao,
          url: url
        }
      })

      const video = await prisma.videos.findUnique({
        where: { id: Number(id) }
      })
      if (!video) {
        return res.status(500).json({ error: "Video não encontrado" })
      }

      res.status(202).json(video)

    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },

  async showVideoByCategoria(req, res) {

    const { id } = req.params
    try {

      const categorias = await prisma.categorias.findUnique({
        where: {
          id: Number(id)
        },
        include: {
          Videos: {
            select: {
              titulo: true
            }
          }
        }
      })

      res.status(200).json({ categorias })

    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },

}