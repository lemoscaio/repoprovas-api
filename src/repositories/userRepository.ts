import { prisma } from "@config/database"
import { CreateUserData } from "src/interfaces/userInterfaces"

export function register(data: CreateUserData) {
  return prisma.user.create({ data })
}

export function findByEmail(email: string) {
  return prisma.user.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
  })
}
