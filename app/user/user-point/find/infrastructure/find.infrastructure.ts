import { IUserPointFind } from "../domain/find.infrastructure";
import { adminFirebase } from "../../../../shared/firebase-db";
import { UserPoint } from "../../../shared/user.point";



class UserPointFindFairbase implements IUserPointFind {

    async byIdUser(idUser: string): Promise<UserPoint[]> {
        try {
            const _points: UserPoint[] = []
            const points = await adminFirebase.firestore().collection("users").doc(idUser).collection("points").get()
            points.forEach(point => {
                const { quantity, reason } = point.data()
                _points.push(new UserPoint(quantity, reason, point.id))
            })
            return _points
        } catch (error) {
            throw error
        }
    }
}

const userPointFindFairbase = new UserPointFindFairbase()
export { userPointFindFairbase }