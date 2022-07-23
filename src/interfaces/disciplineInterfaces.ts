import { Discipline } from "@prisma/client"

export type CreateDiscipline = Omit<Discipline, "id">
