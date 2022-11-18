const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {

    const authToken = req.headers['authorization']

    if (!authToken) {
      return res.status(403).json({ mensagem: "Token não informado" }).end()
    }
    const [beare, token] = authToken.split(" ")

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({ erro: err.message })
      }
    })

    next()
  }
