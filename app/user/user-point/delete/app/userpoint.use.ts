import { pointDeleteFairbase } from "../infrastructure/userpoint.infrastructure";
import { IUserPointDelete } from "../domain/userpoint.infrastructure";


export class UserPointDelete {

    constructor(private deletePoint: IUserPointDelete) { }

    async handle(iduser: string, idPoint: string) {
        try {
          await this.deletePoint.handle(iduser,idPoint)
        } catch (error) {
            throw error
        }
    }
}

const userPointDelete = new UserPointDelete(pointDeleteFairbase)
export { userPointDelete }