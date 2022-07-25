import { validateToken } from "@/middlewares/validateToken"
import { findAllTestsByTag, insertTest } from "@controllers/testController"
import { validateSchema } from "@middlewares/validateSchema"
import { newTestSchema } from "@schemas/newTestSchema"
import { Router } from "express"

export const testsRouter = Router()

testsRouter.use(validateToken)
testsRouter.post("/", validateSchema(newTestSchema), insertTest)
testsRouter.get("/", findAllTestsByTag)
