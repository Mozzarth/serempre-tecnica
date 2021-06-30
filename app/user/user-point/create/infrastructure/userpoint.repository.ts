import { IUserPointCreate } from "../domain/userpoint.repository";
import { UserPoint } from "../../../shared/user.point";
import { adminFirebase } from "../../../../shared/firebase-db";


class UserPointCreateFirebase implements IUserPointCreate {

    async handle(idUser: string, point: UserPoint): Promise<void> {
        try {
            const { id, quantity, reason } = point.toPrimitives()
            await adminFirebase.firestore()
                .collection("users")
                .doc(idUser)
                .collection("points")
                .doc(id).set({ quantity, reason })
        } catch (error) { throw error }
    }
}

const userPointCreateFirebase = new UserPointCreateFirebase()
export { userPointCreateFirebase }