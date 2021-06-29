import { Request, Response, NextFunction } from 'express'


export function handleErrorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
    const infoError = getInformationError(error)
    return res.status(infoError.status).json({
        message: infoError.message,
        erros: undefined,
        error: error
    })
}

function getInformationError(error: Error): { status: number, message: string } {
    const internalError = "Internal Server error"
    const message = error.message || internalError
    let status: number = 500
    return { status, message }
}