import { IUserFindRepository } from "../domain/user-find.repository";
import { adminFirebase } from "../../../shared/firebase-db";
import { User } from "../../shared/user";


class UserFindFirebase implements IUserFindRepository {


    async bydId(id: string): Promise<User | undefined> {
        try {
            const snapshot = await adminFirebase.firestore().collection("users").doc(id).get()
            const data = snapshot.data()
            if (data) {
                const {  email, name, password } = data
                return new User(name, email, password, snapshot.id)
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
            users.forEach(user => {
                const { email, name, password } = user.data()
                temp.push(new User(name, email, password, user.id))
            })
            return temp
        } catch (error) {
            throw error
        }
    }

}

const userFindFirebase = new UserFindFirebase()
export { userFindFirebase }