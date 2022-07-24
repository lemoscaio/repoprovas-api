import { User } from "@prisma/client"

export type CreateUserData = Omit<User, "id">
