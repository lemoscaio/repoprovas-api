import { Teacher } from "@prisma/client"

export type CreateTeacher = Omit<Teacher, "id">
