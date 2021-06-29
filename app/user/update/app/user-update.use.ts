import { userUpdateFirebase } from "../infrastructure/user-update.repository"
import { IUserUpdateRepository } from "../domain/user-update.repository"
import { IUserFindRepository } from "../../find/domain/user-find.repository"
import { ResourceNotFound } from "../../../shared/errors/resource-not-found.error"
import { User } from "../../shared/user"
import { userFindFirebase } from "../../find/infrastructure/user-find.repository"

type param = { id: string, name?: string, email?: string, password?: string }

export class UserUpdate {

    constructor(
        private userFind: IUserFindRepository,
        private userUpdate: IUserUpdateRepository
    ) { }

    async handle(params: param) {
        try {

            const currentUser = await this.userFind.bydId(params.id)
            if (currentUser == undefined) throw new ResourceNotFound()
            const name = params.name ? params.name : currentUser.name
            const email = params.email ? params.email : currentUser.email
            const password = params.password ? params.password : currentUser.password
            const id = params.id
            const userTemp = new User(name, email, password, id)
            const newUser = await this.userUpdate.handle(userTemp)
            return newUser
        } catch (error) {
            throw error
        }
    }

}

const userUpdate = new UserUpdate(userFindFirebase,userUpdateFirebase)
export { userUpdate }