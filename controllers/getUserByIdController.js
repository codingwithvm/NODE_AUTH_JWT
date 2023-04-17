import { getUserById } from "../firebase/firebaseDatabase.js"

async function getUserByIdController(req, res) {
    const id = req.params.id

    // checa se o usuário existe
    getUserById(id)
        .then(response => {
            // Se o usuário existe retorna ele
            if (response.data) return res.status(200).json(response)

            // Se não, exibe uma mensagem de erro
            else return res.status(404).json({ response })
        })
}

export default getUserByIdController