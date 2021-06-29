export interface IUserCreateDto {
    name : string,
    email : string,
    password : string
}

export interface IUserUpdateDto {
    name?: string,
    email?: string,
    password?: string
}