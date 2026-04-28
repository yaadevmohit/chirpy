class CustomBadRequestError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "BadRequestError"
    }
}

export {CustomBadRequestError}