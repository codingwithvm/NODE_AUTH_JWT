// Node imports
import dotEnv from 'dotenv'
import express from 'express'

// App imports
import getUserByIdController from './controllers/getUserByIdController.js'
import registerUserController from './controllers/registerUserController.js'
import loginController from './controllers/loginController.js'
import checkToken from './middlewares/checkToken.js'

// App
dotEnv.config()

const app = express()

// Middlewares
app.use(express.json())

// Private Route
app.get('/user/:id', checkToken, getUserByIdController)

// Register User
app.post('/auth/register', registerUserController)

// Login User
app.post('/auth/login', loginController)

// Server Start
app.listen(process.env.PORT)