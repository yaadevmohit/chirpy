import { NextFunction, Request, Response } from "express";
import { CustomBadRequestError } from "../errors/CustomBadRequestError.js";
import { CustomForbiddenError } from "../errors/CustomForbiddenError.js";
import { CustomNotFoundError } from "../errors/CustomNotFoundError.js";
import { CustomUnauthorizedError } from "../errors/CustomUnauthorizedError.js";

function errorMiddleware(
    err: Error, 
    req: Request,
    res: Response,
    next: NextFunction
) {
    if(err instanceof CustomBadRequestError) {
        res.status(400).send({error: err.message})
    }
    if(err instanceof CustomForbiddenError) {
        res.status(403).send({error: err.message})
    }
    if(err instanceof CustomUnauthorizedError) {
        res.status(401).send({error: err.message})
    }
    if(err instanceof CustomNotFoundError) {
        res.status(404).send({error: err.message})
    }
}

export {errorMiddleware}