import { userCreateFirebase } from "../infrastructure/user-create.repository"
import { ICreateUserRepository } from "../domain/user-create.repository"
import { User } from "../../shared/user"

type params = { name: string, email: string, password: string }


export class UserCreate {
    constructor(private userRepo: ICreateUserRepository) { }

    async handle(params: params) {
        try {
            const { name, email, password } = params
            const user = new User(name, email, password)
            await this.userRepo.handle(user)
            return user
        } catch (error) {
            throw error
        }
    }
}
const userCreate = new UserCreate(userCreateFirebase)
export { userCreate }