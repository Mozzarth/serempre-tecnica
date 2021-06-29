import { handleErrorMiddleware } from './middlewares/handle-error.midd'
import { rt } from './routes'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', rt)
app.use(handleErrorMiddleware)
export { app }