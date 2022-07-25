import { prisma } from "@config/database"
import { Prisma } from "@prisma/client"

function findById(table: Prisma.ModelName, id: number) {
  return prisma[table].findFirst({ where: { id: id } })
}
// function findByName(table: Prisma.ModelName, name: string) {
//   return prisma[table].findFirst({ where: { name: name } })
// }
// function findAll(table: Prisma.ModelName) {
//   return prisma[table].findMany({})
// }

export const queryFactory = {
  findById,
  // findByName,
  // findAll,
}
