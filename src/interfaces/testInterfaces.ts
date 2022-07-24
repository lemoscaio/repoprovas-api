import { Test } from "@prisma/client"

export type CreateTestData = Omit<Test, "id">
