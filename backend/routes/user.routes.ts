import { userController } from '../controllers/user.controller'
import { userById, userCreate, userDelete, userUpdate } from '../middlewares/user.midd'
import { Router } from 'express'


const rt = Router()
rt.get("/users", userController.find.bind(userController))
rt.get("/user/:id", userById(), userController.findById.bind(userController))

rt.post("/user", userCreate(), userController.create.bind(userController))
rt.delete("/user/:id", userDelete(), userController.delete.bind(userController))
rt.put("/user/:id", userUpdate(),userController.update.bind(userController))

export { rt as rtUser }