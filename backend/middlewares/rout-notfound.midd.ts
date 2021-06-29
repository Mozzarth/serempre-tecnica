import { Request, Response, NextFunction } from 'express'


export function pathNotFound(req: Request, res: Response, next: NextFunction) {
    return res.status(404).json({
        status: 404,
        error: `path not found`,
        message: "path not found",
    })
}