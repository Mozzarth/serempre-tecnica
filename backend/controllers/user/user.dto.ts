export interface IPointDto {
    quantity: number,
    reason: string
}

export interface IUserCreateDto {
    name: string,
    email: string,
    password: string,
    points: IPointDto[]
}

export interface IUserUpdateDto {
    name?: string,
    email?: string,
    password?: string,
    points?: IPointDto[]
}


export interface IUserPointCreateDto extends IPointDto {}