import type { Request, Response, NextFunction } from "express";
import { config } from "../config.js";
import { error } from "node:console";
import { CustomBadRequestError } from "../errors/CustomBadRequestError.js";
export function middlewareLogRespones(req: Request, res: Response, next: NextFunction) {
    res.on("finish", () => {
        if (res.statusCode >= 400) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`)
        }
    })
    next()
}

export function middlewareMetricsInc(
    _: Request,
    __: Response,
    next: NextFunction,
) {
    config.filserverHits++
    next()
}


export async function handlerValidate(req: Request, res: Response, next: NextFunction) {
    try {
        const body = req.body.body
        const profaneWords = ["kerfuffle", "sharbert", "fornax"]
        if((body).length <= 140) {
            const filteredWords = []
            for (const word of body.split(" ")) {
                if (profaneWords.includes(word.toLowerCase())) {
                    filteredWords.push("****")
                }
                else {filteredWords.push(word)}
            }
            return res.status(200).send({cleanedBody: filteredWords.join(" ")})
        }
        throw new CustomBadRequestError("Chirp is too long. Max length is 140")
    } catch(error) {
        next(error)
    }
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(error)
    res.status(500).json({
  "error": "Something went wrong on our end"
})
}