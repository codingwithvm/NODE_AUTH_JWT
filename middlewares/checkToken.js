import jwt from 'jsonwebtoken'
import dotEnv from 'dotenv'
dotEnv.config()

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        return res.status(401).json({ msg: "Acesso negado!" })
    }

    try {
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()

    } catch (e) {
        return res.status(400).json({ msg: "Token inválido", e })
    }
}

export default checkToken