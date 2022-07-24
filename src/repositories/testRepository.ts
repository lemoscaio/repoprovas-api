import { prisma } from "@config/database"
import { CreateTestData } from "src/interfaces/testInterfaces"

export const testRepository = {
  insertTest(data: CreateTestData) {
    return prisma.test.create({ data })
  },
  findAllTestsByTermAndDiscipline() {
    return prisma.term.findMany({
      orderBy: [{ number: "desc" }],
      include: {
        disciplines: {
          include: {
            tests: {
              select: {
                id: true,
                name: true,
                pdfUrl: true,
                category: true,
                teacher: true,
              },
            },
          },
        },
      },
    })
  },
}
