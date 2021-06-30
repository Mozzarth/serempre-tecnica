import { IUserFindRepository } from "../domain/user-find.repository";
import { userFindFirebase } from "../infrastructure/user-find.repository";



export class UserFind {

    constructor(private userFind: IUserFindRepository) { }

    async all() {
        try {
            const users = await this.userFind.all()
            return users.map(user => {
                const tempUSer = user.toPrimitives()
                const points = tempUSer.points
                return { id: tempUSer.id, name: tempUSer.name, email: tempUSer.email, points }
            })
        } catch (error) {
            throw error
        }
    }
    async byId(id: string) {
        try {
            const user = await this.userFind.bydId(id)
            return user
        } catch (error) {
            throw error
        }
    }
}

const userFind = new UserFind(userFindFirebase)
export { userFind }