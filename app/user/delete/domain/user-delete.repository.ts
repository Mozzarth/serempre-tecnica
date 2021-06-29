

export interface IUserDeleteRepository {
    handle(id : string) : Promise<void>
}