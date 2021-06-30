import { ICreateUserRepository } from "../domain/user-create.repository";
import { adminFirebase } from "../../../shared/firebase-db";
import { User } from "../../shared/user";

class UserCreateFirebase implements ICreateUserRepository {

    async handle(user: User): Promise<void> {
        try {
            const prm = new Promise(async (res, rej) => {
                try {
                    const { id, name, email, password, points } = user.toPrimitives()
                    await adminFirebase
                        .firestore()
                        .collection("users")
                        .doc(id)
                        .set({ name, email, password })

                    const pontsAsync = points.map(point => {
                        return adminFirebase
                            .firestore()
                            .collection(`users/${id}/points`)
                            .doc(point.id)
                            .set({ quantity: point.quantity, reason: point.reason })
                    })
                    await Promise.all(pontsAsync)
                    res(null)
                } catch (error) { rej(error) }
            })
            await prm
        } catch (error) {
            throw error
        }
    }

}
const userCreateFirebase = new UserCreateFirebase()
export { userCreateFirebase }