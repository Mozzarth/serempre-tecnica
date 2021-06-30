import { adminFirebase } from "../../../../shared/firebase-db";
import { IUserPointDelete } from "../domain/userpoint.infrastructure";



class UserPointDeleteFairbase implements IUserPointDelete {

    async handle(idUser: string, idPoint: string): Promise<void> {
        try {
            await adminFirebase.firestore().collection("users").doc(idUser).collection("points").doc(idPoint).delete()
        } catch (error) {
            throw error
        }
    }

}

const pointDeleteFairbase = new UserPointDeleteFairbase()
export { pointDeleteFairbase }