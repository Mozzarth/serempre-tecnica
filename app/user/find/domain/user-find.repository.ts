import { User } from "../../shared/user";

export interface IUserFindRepository {
    all(): Promise<User[]>
    bydId(id : string): Promise<User | undefined>
}