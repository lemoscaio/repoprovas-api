import { Term } from "@prisma/client"

export type CreateTerm = Omit<Term, "id">
