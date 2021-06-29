import { IUserDeleteRepository } from "../domain/user-delete.repository";
import { adminFirebase } from "../../../shared/firebase-db";


class UserDeleteFirebase implements IUserDeleteRepository {


    async handle(id: string): Promise<any> {
        try {
            await adminFirebase.firestore().collection("users").doc(id).delete()
        } catch (error) {
            throw error
        }
    }
}

const userDeleteFirebase = new UserDeleteFirebase()
export { userDeleteFirebase }