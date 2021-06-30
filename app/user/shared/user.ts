import { v4 as uuid } from 'uuid';
import { UserPoint } from './user.point';


export class User {
    public readonly id: string
    public readonly name: string
    public readonly email: string
    public readonly password: string
    public readonly points: UserPoint[]


    constructor(
        name: string,
        email: string,
        password: string,
        points: UserPoint[],
        id: string | undefined = undefined) {
            
        this.id = id ? id : uuid()
        this.name = name
        this.email = email
        this.points = points
        this.password = password
    }

    toPrimitives() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            points: this.points.map(point => point.toPrimitives()) || []
        }
    }
}