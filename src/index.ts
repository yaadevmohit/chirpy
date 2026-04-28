import express from "express";
import { Request, Response, NextFunction } from "express";
import { handlerValidate, middlewareMetricsInc } from "./api/middleware.js";
import { handlerReset } from "./admin/reset.js";
import { handlerMetrics } from "./admin/metrics.js";
import { errorMiddleware } from "./api/errorMiddleware.js";

const app = express();
const PORT = 8080



function handlerReadiness(req: Request, res: Response, next: NextFunction) {
    res.set("Content-Type", "text/plain")
    res.send("OK")
    next()
}


app.use(express.json())
app.use("/app", middlewareMetricsInc, express.static("./src/app"));
app.get("/api/healthz", (req, res, next) => {
    Promise.resolve(handlerReadiness(req, res, next)).catch(next)
});
app.get("/admin/metrics", (req, res, next) => {
    Promise.resolve(handlerMetrics(req,res)).catch(next)
})
app.post("/admin/reset", (req, res, next) => {
    Promise.resolve(handlerReset(req,res)).catch(next)
})
app.post("/api/validate_chirp", (req, res, next) => {
    Promise.resolve(handlerValidate(req,res, next)).catch(next)
})
app.use(errorMiddleware)

app.listen(PORT, () => {console.log("server running brother have a nice day")})
