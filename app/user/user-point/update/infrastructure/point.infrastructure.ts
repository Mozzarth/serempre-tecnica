import { IUserPointUpdate } from "../domain/point.infrasructure";
import { UserPoint } from "../../../shared/user.point";
import { adminFirebase } from "../../../../shared/firebase-db";


class UserPointCreateFairbase implements IUserPointUpdate {
    async handle(idUser: string, point: UserPoint): Promise<void> {
        try {
            const { id, quantity, reason } = point.toPrimitives()
            await adminFirebase.firestore()
                .collection("users")
                .doc(idUser)
                .collection("points")
                .doc(id).update({ quantity, reason })
        } catch (error) { throw error }
    }
}


const userPointCreateFairbase = new UserPointCreateFairbase()
export { userPointCreateFairbase }