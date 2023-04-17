import bcrypt from 'bcrypt'

async function checkPassword(password, userPassword) {
    try {
        const data = await bcrypt.compare(password, userPassword)

        return data
    } catch(e) {
        console.log("bcrypt: Erro: ", e)
    }
}

export default checkPassword