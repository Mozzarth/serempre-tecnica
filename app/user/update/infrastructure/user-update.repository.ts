import { IUserUpdateRepository } from "../domain/user-update.repository";
import { adminFirebase } from "../../../shared/firebase-db";
import { User } from "../../shared/user";


class UserUpdateFirebase implements IUserUpdateRepository {

    async handle(user: User): Promise<User> {
        try {
            const prm = new Promise(async (res, rej) => {
                try {
                    const _user = user.toPrimitives()
                    await adminFirebase.firestore()
                        .collection("users").doc(_user.id)
                        .update(_user)
                    res(user)
                } catch (error) { rej(error) }
            })
            await prm
            return user
        } catch (error) { throw error }
    }
}

const userUpdateFirebase = new UserUpdateFirebase()
export { userUpdateFirebase }