import { Category } from "@prisma/client"

export type CreateCategory = Omit<Category, "id">
