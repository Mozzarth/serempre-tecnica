import { ResourceNotFound } from "../../../shared/errors/resource-not-found.error"
import { userFindFirebase } from "../../find/infrastructure/user-find.repository"
import { userUpdateFirebase } from "../infrastructure/user-update.repository"
import { IUserFindRepository } from "../../find/domain/user-find.repository"
import { IUserUpdateRepository } from "../domain/user-update.repository"
import { User } from "../../shared/user"

// type point = { quantity: number, reason: string }
type param = { id: string, name?: string, email?: string, password?: string }

export class UserUpdate {

    constructor(
        private userFind: IUserFindRepository,
        private userUpdate: IUserUpdateRepository
    ) { }

    async handle(params: param) {
        try {
            const id = params.id
            const { name, email, password, points } = await this.getUserNew(params)
            const userTemp = new User(name, email, password, points, id)
            const newUser = await this.userUpdate.handle(userTemp)
            return newUser
        } catch (error) {
            throw error
        }
    }

    private async getUserNew(params: param) {
        const currentUser = await this.userFind.bydId(params.id)
        if (currentUser == undefined) throw new ResourceNotFound()
        const password = params.password ? params.password : currentUser.password
        const email = params.email ? params.email : currentUser.email
        const name = params.name ? params.name : currentUser.name
        const points = currentUser.points
        return { password, points, email, name }
    }

}

const userUpdate = new UserUpdate(userFindFirebase, userUpdateFirebase)
export { userUpdate }