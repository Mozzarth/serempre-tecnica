import { UserPoint } from "../../../shared/user.point"
import { IUserPointCreate } from "../domain/userpoint.repository"
import { userPointCreateFirebase } from "../infrastructure/userpoint.repository"

type param = { quantity: number, reason: string }

export class UserPointCreate {

    constructor(private create: IUserPointCreate) { }

    async handle(idUser: string, param: param) {
        try {
            const point = new UserPoint(param.quantity, param.reason)
            await this.create.handle(idUser, point)
            return point.toPrimitives()
        } catch (error) { throw error }
    }

}

const userPointCreate = new UserPointCreate(userPointCreateFirebase)
export { userPointCreate }