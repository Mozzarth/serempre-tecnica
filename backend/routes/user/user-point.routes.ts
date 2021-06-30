import { userPointController } from "../../controllers/user/user-point.controller"
import { userPointDelete,userPointCreate, userPointUpdate } from "../../middlewares/user/user-point.midd"
import { Router } from "express"


const rt = Router()
const ctrl = userPointController

rt.delete("/:idUser/point/:idPoint", userPointDelete(), ctrl.delete.bind(ctrl))
rt.post("/:idUser/point", userPointCreate(), ctrl.create.bind(ctrl))
rt.put("/:idUser/point/:idPoint", userPointUpdate(), ctrl.update.bind(ctrl))


export { rt as rtUserPoint }