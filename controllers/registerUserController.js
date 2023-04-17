import jwt from 'jsonwebtoken'

import { registerUser, emailExist } from "../firebase/firebaseDatabase.js"
import bcryptPassword from "../app/createPassword.js"

async function registerUserController(req, res) {
    const { name, email, password, confirmpassword } = req.body

    // Verifica se todos os dados foram digitados
    if (!name) return res.status(422).json({ msg: "Nome em branco" })
    if (!email) return res.status(422).json({ msg: "Email em branco" })
    if (!password) return res.status(422).json({ msg: "Senha em branco" })
    if (!confirmpassword) return res.status(422).json({ msg: "Confirmação de senha em branco" })

    // Verifica se as duas senhas conferem
    if (password !== confirmpassword) return res.status(422).json({ msg: "Senhas não conferem" })

    // Verifica se o usuário já está cadastrado
    emailExist(email)
        .then(response => {

            if (response.userEmail === email) return res.status(422).json({ msg: "Email já cadastrado" })

            // cadastro do usuário
            else {
                // encripta a senha
                bcryptPassword(password)
                    .then(pass => {

                        const user = { name, email, pass }

                        try {
                            // registra o usuário
                            registerUser(user).then(registerUserResponse => {
                                const secret = process.env.SECRET

                                const token = jwt.sign({
                                    id: response.userEmail
                                }, secret)

                                // Envia o status do servidor com sucesso
                                return res.status(201).json({ msg: "Usuário cadastrado com sucesso", registerUserResponse, token })
                            }).catch(e => {
                                // Se acontecer algum erro
                                return res.status(500).json({
                                    msg: "Aconteceu um erro no servidor", e
                                })
                            })
                        }
                        catch (e) {
                            // Se acontecer algum erro
                            return res.status(500).json({
                                msg: "Aconteceu um erro no servidor", e
                            })
                        }

                    })
            }
        }).catch(e => {
            // Se acontecer algum erro
            return res.status(500).json({
                msg: "Aconteceu um erro no servidor", e
            })
        })

    // Criar senha
}

export default registerUserController