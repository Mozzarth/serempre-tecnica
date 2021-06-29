import { User } from "../../shared/user";

// Return new user
export interface IUserUpdateRepository {
    handle(user: User): Promise<User>
}