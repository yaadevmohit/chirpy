export class CustomUnauthorizedError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "UnauthorizedError"
    }
}