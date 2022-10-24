const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient

module.exports = {

  async newVideo(req, res) {
    const { titulo, descricao, url } = req.body

    if (!titulo || titulo.length > 30 || titulo.length < 5) {
      return res.status(400).json({ mensagem: "Titulo não pode ser estar vazio, ter menos que 5 caracteres ou mais que 30" })
    }
    if (!descricao || descricao.length > 150 || descricao.length < 5) {
      return res.status(400).json({ mensagem: "Descrição não pode ser estar vazio, ter menos que 5 caracteres ou mais que 150" })
    }
    if (!url || url.length > 150 || url.length < 5) {
      return res.status(400).json({ mensagem: "Url não pode ser estar vazio, ter menos que 5 caracteres ou mais que 150" })
    }

    try {
      const video = await prisma.videos.create({
        data: {
          ...req.body
        }
      })
      res.status(200).json({ video })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }

  }

}