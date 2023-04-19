import jwt from 'jsonwebtoken'

import { emailExist } from "../firebase/firebaseDatabase.js"
import checkPassword from "../app/checkPassword.js"

async function loginController(req, res) {
    const { email, password } = req.body

    // Validations
    if (!email) return res.status(422).json({ msg: "Email é obrigatório" })
    if (!password) return res.status(422).json({ msg: "Senha é obrigatório" })

    // Verifica se o usuário existe
    emailExist(email)
        .then(response => {
            if (email === response.userEmail) {
                // Se o email estiver cadastrado, verifica se a senha está correta
                checkPassword(password, response.userPass).then(passResponse => {
                    // Aqui fazemos uma comparação entre com a senha digitada e a senha cadastrada no banco de dados, retorna um valor bool
                    if (passResponse) {
                        // Login
                        const secret = process.env.SECRET

                        const token = jwt.sign({
                            id: response.userEmail
                        }, secret)

                        return res.status(200).json({ msg: "Autenticação realizada com sucesso", token, user: { email: response.userEmail, name: response.userName } })
                    }

                    // Se a senha estiver incorreta
                    else return res.status(422).json({ msg: "Senha incorreta" })
                })
            }
            else return res.status(422).json({ msg: "Email não cadastrado" })
        })
}

export default loginController