import { User } from "../../shared/user";

export interface ICreateUserRepository {
    handle(user: User): Promise<void>
}