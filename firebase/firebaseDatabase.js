// Node imports
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    query,
    where,
    getDocs,
    addDoc
} from 'firebase/firestore'

// App imports
import firebaseApp from './frebaseApp.js'

// Application
const db = getFirestore(firebaseApp)

// Autenticação do usuário
async function authUser() {

}

// Registra usuário
async function registerUser(userData) {
    const { name, email, pass } = userData
    // referencia do banco de dados
    const userRef = collection(db, "users")

    try {
        const docRef = await addDoc(userRef, {
            name, email, pass
        })

        return {
            msg: "Usuário cadastrado",
            id: docRef.id
        }
    }
    catch (e) {
        console.log("Firebase: Erro ao registrar usuário: ", e)
    }
}

// Verifica no banco de dados se o email já existente, retorna apenas o email digitado
async function emailExist(email) {
    let userEmail
    let userName
    let userPass

    const userRef = collection(db, "users")
    const q = query(userRef, where("email", "==", email))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach(doc => {
        const data = doc.data()

        userEmail = data.email
        userName = data.name
        userPass = data.pass

        return {
            userEmail,
            userName,
            userPass
        }
    })

    // retorna o email resultante da query
    return { userEmail, userName, userPass }
}

// Busca o usuário pelo id
async function getUserById(id) {
    const docRef = doc(db, "users", id)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()) {
        const data = docSnap.data()

        return {
            msg: "Usuário encontrado",
            data: {
                name: data.name,
                email: data.email
            }
        }
    } else {
        return {
            msg: "Usuário não encontrado"
        }
    }
}

export {
    registerUser,
    emailExist,
    getUserById
}