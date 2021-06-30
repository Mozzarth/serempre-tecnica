import { UserPoint } from "../../../shared/user.point";


export interface IUserPointUpdate {
    handle(idUser:string,point : UserPoint):Promise<void>
}