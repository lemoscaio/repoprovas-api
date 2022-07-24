import { prisma } from "@config/database"
import { CreateTestData } from "src/interfaces/testInterfaces"

export const testRepository = {
  insertTest(data: CreateTestData) {
    return prisma.test.create({ data })
  },
}
