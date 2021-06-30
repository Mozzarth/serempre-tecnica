import { v4 as uuid } from 'uuid';

export class UserPoint {

    public readonly id: string
    public readonly quantity: number
    public readonly reason: string

    constructor(quantity: number, reason: string, id: string = "") {
        this.id = id ? id : uuid()
        this.quantity = quantity
        this.reason = reason
    }

    toPrimitives() {
        return {
            id : this.id,
            reason: this.reason,
            quantity : this.quantity
        }
    }

}