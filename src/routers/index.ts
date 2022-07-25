import { Router } from "express"
import { authRouter } from "./authRouter"
import { categoriesRouter } from "./categoriesRouter"
import { testsRouter } from "./testsRouter"

export const router = Router()

router.use(authRouter)
router.use("/tests", testsRouter)
router.use("/categories", categoriesRouter)
