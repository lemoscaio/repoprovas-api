import { queryFactory } from "@/factories/queryFactory"

export const categoryService = {
  async findAllCategories() {
    const categories = await queryFactory.findAll("Category")

    return categories
  },
}
