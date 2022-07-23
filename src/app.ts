import cors from "cors"
import dotenv from "dotenv"
import express, { Request, Response } from "express"
import "express-async-errors"

import { handleError } from "@middlewares/errorHandler"
import { router } from "@routers/index"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req: Request, res: Response) => res.send("Online"))
app.use(router)

app.use(handleError)

export default app
