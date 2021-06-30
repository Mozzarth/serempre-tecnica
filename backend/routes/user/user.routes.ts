import { userById, userCreate, userDelete, userUpdate } from '../../middlewares/user/user.midd'
import { userController } from '../../controllers/user/user.controller'
import { Router } from 'express'
import { rtUserPoint } from './user-point.routes'




const rt = Router()
rt.get("/users", userController.find.bind(userController))
rt.get("/user/:id", userById(), userController.findById.bind(userController))
rt.post("/user", userCreate(), userController.create.bind(userController))
rt.delete("/user/:id", userDelete(), userController.delete.bind(userController))
rt.put("/user/:id", userUpdate(),userController.update.bind(userController))

rt.use("/user", rtUserPoint)


export { rt as rtUser }