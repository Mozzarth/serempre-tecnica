import { v4 as uuid } from 'uuid';


export class User {
    public readonly id: string
    public readonly name: string
    public readonly email: string
    public readonly password: string


    constructor(name: string, email: string, password: string, id: string | undefined = undefined) {
        this.id = id ? id : uuid()
        this.name = name
        this.email = email
        this.password = password
    }

    toPrimitives() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password
        }
    }
}