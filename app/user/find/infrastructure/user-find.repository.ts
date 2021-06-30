import { IUserFindRepository } from "../domain/user-find.repository";
import { adminFirebase } from "../../../shared/firebase-db";
import { User } from "../../shared/user";
import { UserPoint } from "../../shared/user.point";


class UserFindFirebase implements IUserFindRepository {


    async bydId(id: string): Promise<User | undefined> {
        try {
            const firebaseDoc = await adminFirebase.firestore().collection("users").doc(id).get()
            const data = firebaseDoc.data()
            if (data) {
                const { email, name, password } = data
                const user = new User(name, email, password, [], firebaseDoc.id)
                const points = await adminFirebase.firestore().collection("users").doc(firebaseDoc.id).collection("points").get()
                points.forEach(point => {
                    const { reason, quantity } = point.data()
                    user.points.push(new UserPoint(quantity, reason, point.id))
                })
                return user
            }
            return undefined
        } catch (error) {
            throw error
        }
    }


    async all(): Promise<User[]> {
        try {
            const users = await adminFirebase.firestore().collection("users").get()
            const temp: User[] = []
            users.forEach(async (user) => {
                const { email, name, password } = user.data()
                const tempPoint: UserPoint[] = []
                // const points = await user.ref.collection("points").get()
                // points.forEach(point => {
                //     const { quantity, reason } = point.data()
                //     tempPoint.push(new UserPoint(quantity,reason,point.id))
                // })
                temp.push(new User(name, email, password, tempPoint, user.id))
            })
            for await (const user of temp) {
                const points = await adminFirebase.firestore().collection("users").doc(user.id).collection("points").get()
                points.forEach(point => {
                    const { reason, quantity } = point.data()
                    user.points.push(new UserPoint(quantity, reason, point.id))
                })
            }
            return temp
        } catch (error) {
            throw error
        }
    }

}

const userFindFirebase = new UserFindFirebase()
export { userFindFirebase }