

export interface IUserPointDelete {
    handle(idUser : string,idPoint : string):Promise<void>
}