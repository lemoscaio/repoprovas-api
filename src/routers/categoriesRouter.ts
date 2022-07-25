import { findAllCategories } from "@/controllers/categoriesController"
import { validateToken } from "@/middlewares/validateToken"
import { Router } from "express"

export const categoriesRouter = Router()

categoriesRouter.use(validateToken)
categoriesRouter.get("/", findAllCategories)
