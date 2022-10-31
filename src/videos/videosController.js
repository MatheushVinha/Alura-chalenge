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

module.exports = {

  async newVideo(req, res) {
    const { titulo, descricao, url } = req.body
    try {
      validaCorpo(titulo, descricao, url)
      const video = await prisma.videos.create({
        data: {
          ...req.body
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
      if (titulo && titulo.length > 30 || titulo &&titulo.length <5) {
        throw new Error('Titulo não pode ser estar vazio, ter menos que 5 caracteres ou mais que 30')
      }
      if (descricao && descricao.length > 150 || descricao && descricao.length < 5) {
        throw new Error('Descrição não pode ser estar vazio, ter menos que 5 caracteres ou mais que 150')
      }
      if (url && url.length > 250 || url && url.length < 5) {
        throw new Error('Url não pode ser estar vazio, ter menos que 5 caracteres ou mais que 150')
      }

      const updateVideo = await prisma.videos.updateMany({
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
      if(!video) {
        return res.status(500).json({ error: "Video não encontrado"})
      }
      res.status(202).json(video)

    } catch (error) {
      return res.status(500).json({ error: error.message })
    }

  }
}