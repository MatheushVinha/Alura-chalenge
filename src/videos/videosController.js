const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient

function validaCorpo(titulo, descricao, url) {
  if (!titulo || titulo.length > 30 || titulo.length < 5) {
    throw new Error('Titulo não pode ser estar vazio, ter menos que 5 caracteres ou mais que 30')
  }
  if (!descricao || descricao.length > 250 || descricao.length < 5) {
    throw new Error('Descrição não pode ser estar vazio, ter menos que 5 caracteres ou mais que 150')
  }
  if (!url || url.length > 150 || url.length < 5) {
    throw new Error('Url não pode ser estar vazio, ter menos que 5 caracteres ou mais que 150')
  }
}
function ValidaUpdate(titulo, descricao, url) {
  if (titulo && titulo.length > 30 || titulo && titulo.length < 5) {
    throw new Error('Titulo não pode ser estar vazio, ter menos que 5 caracteres ou mais que 30')
  }
  if (descricao && descricao.length > 350 || descricao && descricao.length < 5) {
    throw new Error('Descrição não pode ser estar vazio, ter menos que 5 caracteres ou mais que 150')
  }
  if (url && url.length > 150 || url && url.length < 5) {
    throw new Error('Url não pode ser estar vazio, ter menos que 5 caracteres ou mais que 150')
  }
}

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
      validaCorpo(titulo, descricao, url)
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

    const { search } = req.query
    //query params
    if (search) {

      if (Array.isArray(search)) {
        return res.status(400).json({ erro: 'Serch só pode receber uma propriedade' })
      }
      try {

        const videos = await prisma.videos.findMany({
          where: { titulo: { contains: search } }
        })

        if (!videos) {
          return res.status(500).json({ mensagem: "Video não encontrado" })
        }
        return res.status(200).json({ videos })

      } catch (error) {
        return res.status(500).json({ error: error.message })
      }
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

      ValidaUpdate(titulo, descricao, url)

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