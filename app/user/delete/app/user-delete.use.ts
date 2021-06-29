import { IUserDeleteRepository } from "../domain/user-delete.repository";
import { userDeleteFirebase } from "../infrastructure/user-delete.firebase";

export class UserDelete {


    constructor(private userDelete: IUserDeleteRepository) { }

    async handle(id: string) {
        try {
            const result = await this.userDelete.handle(id)
            return result
        } catch (error) {
            throw error
        }
    }
}

const userDelete = new UserDelete(userDeleteFirebase)
export { userDelete }

