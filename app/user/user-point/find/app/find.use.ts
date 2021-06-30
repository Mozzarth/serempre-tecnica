import { IUserPointFind } from "../domain/find.infrastructure";


export class UserPointFind {

    constructor(private findPoint: IUserPointFind){}

    async byId(idUser : string) {
        try {
            const points = await this.findPoint.byIdUser(idUser)
            return points.map(point => point.toPrimitives())            
        } catch (error) { throw error }
    }
}