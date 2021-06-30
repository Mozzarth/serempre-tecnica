import { userPointCreate, UserPointCreate } from "../../../app/user/user-point/create/app/userpoint.use";
import { userPointDelete, UserPointDelete } from "../../../app/user/user-point/delete/app/userpoint.use";
import { userPointUpdate, UserPointUpdate } from "../../../app/user/user-point/update/app/point.use";
import { Request, Response, NextFunction } from "express";
import { IUserPointCreateDto } from "./user.dto";



class UserPointController {


    constructor(
        private deletePoint: UserPointDelete,
        private createPoint: UserPointCreate,
        private updatePoint: UserPointUpdate
    ) { }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const idUser = req.params.idUser
            const idPoint = req.params.idPoint
            await this.deletePoint.handle(idUser, idPoint)
            res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const idUser = req.params.idUser
            const body: IUserPointCreateDto = req.body
            const point = await this.createPoint.handle(idUser, body)
            res.status(201).json(point)
        } catch (error) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const idUser = req.params.idUser
            const idPoint = req.params.idPoint
            const { quantity, reason }: IUserPointCreateDto = req.body
            const newPoint = await this.updatePoint.handle({ idUser, idPoint, quantity, reason })
            res.status(201).json(newPoint)
        } catch (error) {
            next(error)
        }

    }
}

const userPointController = new UserPointController(userPointDelete, userPointCreate, userPointUpdate)
export { userPointController }