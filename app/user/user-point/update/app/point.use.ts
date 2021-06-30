import { userPointFindFairbase } from "../../find/infrastructure/find.infrastructure"
import { ResourceNotFound } from "../../../../shared/errors/resource-not-found.error"
import { userPointCreateFairbase } from "../infrastructure/point.infrastructure"
import { IUserPointFind } from "../../find/domain/find.infrastructure"
import { IUserPointUpdate } from "../domain/point.infrasructure"
import { UserPoint } from "../../../shared/user.point"


type param = { idUser: string, idPoint: string, quantity: number, reason: string }

export class UserPointUpdate {

    constructor(
        private updatePoint: IUserPointUpdate,
        private findPoint: IUserPointFind) { }

    async handle(param: param) {
        try {
            const points = await this .findPoint.byIdUser(param.idUser)
            if (points.find(point => point.id == param.idPoint) == undefined) throw new ResourceNotFound()
            const newPoint = new UserPoint(param.quantity, param.reason, param.idPoint)
            await this.updatePoint.handle(param.idUser, newPoint)
            return newPoint
        } catch (error) { throw error }
    }

}

const userPointUpdate = new UserPointUpdate(userPointCreateFairbase, userPointFindFairbase)
export { userPointUpdate }