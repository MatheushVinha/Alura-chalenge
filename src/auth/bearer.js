const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {

    const authToken = req.headers['authorization']

    if (!authToken) {
      return res.status(403).json({ mensagem: "Token não informado" })
    }
    const [beare, token] = authToken.split(" ")

    jwt.verify(token, process.env.SECRET, (err) => {
      if (err) {
        return res.status(403).json({ erro: err.message })
      }
    })

    next()
  }
