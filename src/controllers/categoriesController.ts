import { categoryService } from "@/services/categoryService"
import { Request, Response } from "express"

export async function findAllCategories(req: Request, res: Response) {
  const categories = await categoryService.findAllCategories()

  res.send({ categories })
}
