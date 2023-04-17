import { initializeApp } from "firebase/app"

import firebaseConfig from "./firebaseConfig.js"

const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp