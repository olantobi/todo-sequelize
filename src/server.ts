import express from 'express'

import db from './config/database.config'
import todoRouter from './route'


const app = express()
const PORT = 9000

db.sync().then(() => console.log('connected to database'))

app.use(express.json())

app.use('/api/v1/todo', todoRouter)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))