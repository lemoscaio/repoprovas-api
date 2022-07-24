import { findAllTestsByTag, insertTest } from "@controllers/testController"
import { validateSchema } from "@middlewares/validateSchema"
import { newTestSchema } from "@schemas/newTestSchema"
import { Router } from "express"

export const testsRouter = Router()

testsRouter.post("/", validateSchema(newTestSchema), insertTest)
testsRouter.get("/", findAllTestsByTag)
