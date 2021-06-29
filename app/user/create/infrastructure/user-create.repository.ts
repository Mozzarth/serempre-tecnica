import { ICreateUserRepository } from "../domain/user-create.repository";
import { adminFirebase } from "../../../shared/firebase-db";
import { User } from "../../shared/user";

class UserCreateFirebase implements ICreateUserRepository {

    async handle(user: User): Promise<void> {
        try {
            const prm = new Promise((res, rej) => {
                const { id, name, email, password } = user.toPrimitives()
                adminFirebase.firestore().collection("users").doc(id).set({ name, email, password })
                .then(e => res(e))
                .catch(e => rej(e))
            })
            await prm
        } catch (error) {
            throw error
        }
    }

}
const userCreateFirebase = new UserCreateFirebase()
export { userCreateFirebase }