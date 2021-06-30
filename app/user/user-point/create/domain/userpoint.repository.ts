import { UserPoint } from "../../../shared/user.point";


export interface IUserPointCreate {
    handle(idUser: string, point: UserPoint): Promise<void>
}