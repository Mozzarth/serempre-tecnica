import { userCreateFirebase } from "../infrastructure/user-create.repository"
import { ICreateUserRepository } from "../domain/user-create.repository"
import { UserPoint } from "../../shared/user.point"
import { User } from "../../shared/user"

type point = { quantity: number, reason: string }
type params = { name: string, email: string, password: string, points: point[]}


export class UserCreate {
    constructor(private userRepo: ICreateUserRepository) { }

    async handle(params: params) {
        try {
            const { name, email, password ,points } = params
            const pointsObjs = points.map(point => new UserPoint(point.quantity,point.reason))
            const user = new User(name, email, password, pointsObjs)
            await this.userRepo.handle(user)
            return user
        } catch (error) {
            throw error
        }
    }
}
const userCreate = new UserCreate(userCreateFirebase)
export { userCreate }