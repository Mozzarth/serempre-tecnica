import { UserPoint } from "../../../shared/user.point";


export interface IUserPointFind {
    byIdUser(idUser: string): Promise<UserPoint[]>
}