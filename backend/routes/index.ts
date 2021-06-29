import { pathNotFound } from '../middlewares/rout-notfound.midd'
import { rtUser } from './user.routes'
import { Router } from 'express'


const rt = Router()

rt.use(rtUser)
rt.use(pathNotFound)


export { rt }