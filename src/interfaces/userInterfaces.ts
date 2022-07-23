import { User } from "@prisma/client"

export type CreateUserData = Omit<User, "id">

export type CreateUserBody = CreateUserData & { confirmPassword: string }
