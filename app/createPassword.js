import bcrypt from 'bcrypt'

async function bcryptPassword(password) {
    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    return passwordHash
}

export default bcryptPassword