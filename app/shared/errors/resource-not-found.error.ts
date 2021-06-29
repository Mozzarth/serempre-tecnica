

export class ResourceNotFound extends Error {
    constructor(message?: string) {
        const _message = message || "Resource Not Found"
        super(_message)
    }

}