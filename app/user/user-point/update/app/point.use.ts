import { userPointCreateFairbase } from "../infrastructure/point.infrastructure"
import { IUserPointUpdate } from "../domain/point.infrasructure"
import { UserPoint } from "../../../shared/user.point"

type param = { idUser: string, idPoint: string, quantity: number, reason: string }

export class UserPointUpdate {

    constructor(private updatePoint: IUserPointUpdate) { }

    async handle(param: param) {
        try {
            const newPoint = new UserPoint(param.quantity, param.reason, param.idPoint)
            await this.updatePoint.handle(param.idUser, newPoint)
            return newPoint
        } catch (error) { throw error }
    }

}

const userPointUpdate = new UserPointUpdate(userPointCreateFairbase)
export { userPointUpdate }