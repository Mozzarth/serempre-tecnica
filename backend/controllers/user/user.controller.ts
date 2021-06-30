import { UserCreate, userCreate } from '../../../app/user/create/app/user-create.use'
import { userUpdate, UserUpdate } from '../../../app/user/update/app/user-update.use'
import { userDelete, UserDelete } from '../../../app/user/delete/app/user-delete.use'
import { userFind, UserFind } from '../../../app/user/find/app/user-find.use'
import { IUserCreateDto, IUserUpdateDto } from './user.dto'
import { Request, Response, NextFunction } from 'express'
import md5 from 'md5'

class UserController {

    constructor(
        private createUseCase: UserCreate,
        private findUseCase: UserFind,
        private deleteUser: UserDelete,
        private updateUser: UserUpdate
    ) { }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user: IUserCreateDto = req.body
            const { name, email, password, points } = user
            const newUSer = await this.createUseCase.handle({ name, email, password: md5(password), points })
            const { id } = newUSer.toPrimitives()
            res.status(201).json({ id, name, email, points })
        } catch (error) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const { email, name, password, points }: IUserUpdateDto = req.body
            let passwordEncript = password ? md5(password) : undefined
            const newUser = await this.updateUser.handle({ id, email, name, password: passwordEncript })
            res.status(200).json(newUser.toPrimitives())
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const data = await this.deleteUser.handle(id)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
    async find(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.findUseCase.all()
            res.json(users)
        } catch (error) {
            next(error)
        }
    }
    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            let data: any = await this.findUseCase.byId(id)
            if (data) {
                data = data.toPrimitives()
                delete data.password
            }
            res.status(data ? 200 : 404).json(data)
        } catch (error) {
            next(error)
        }
    }
}


const userController = new UserController(userCreate, userFind, userDelete, userUpdate)

export { userController }

