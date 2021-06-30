import { validRouter } from "../express-validator.midd";
import { body, param } from "express-validator";


export function userPointDelete() {
    return [
        param("idUser", "idUser is uuid")
            .exists()
            .isUUID(),
        param("idPoint", "idPoint is uuid")
            .exists()
            .isUUID(),
        validRouter
    ]
}
export function userPointUpdate() {
    return [
        param("idUser", "idUser is uuid")
            .exists()
            .isUUID(),
        param("idPoint", "idPoint is uuid")
            .exists()
            .isUUID(),
        body("quantity")
            .exists()
            .isInt({ min: 0 }),
        body("reason")
            .exists()
            .isLength({ min: 2 }),
        validRouter
    ]
}
export function userPointCreate() {
    return [
        param("idUser", "idUser is uuid")
            .exists()
            .isUUID(),
        body("quantity")
            .exists()
            .isInt({ min: 0 }),
        body("reason")
            .exists()
            .isLength({ min: 2 }),
        validRouter
    ]
}