import { TeacherDiscipline } from "@prisma/client"

export type CreateTeacherDiscipline = Omit<TeacherDiscipline, "id">
