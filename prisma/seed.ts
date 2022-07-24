import { CreateTestData } from "@/interfaces/testInterfaces"
import { PrismaClient } from "@prisma/client"
import { CreateCategory } from "src/interfaces/categoryInterfaces"
import { CreateDiscipline } from "src/interfaces/disciplineInterfaces"
import { CreateTeacher } from "src/interfaces/teacherInterfaces"
import { CreateTerm } from "src/interfaces/termInterfaces"

type CreateSeedTeacher = CreateTeacher & { disciplines: CreateDiscipline[] }

const prisma = new PrismaClient()

async function main() {
  const terms: CreateTerm[] = [
    {
      number: 1,
    },
    {
      number: 2,
    },
    {
      number: 3,
    },
    {
      number: 4,
    },
    {
      number: 5,
    },
    {
      number: 6,
    },
  ]
  const categories: CreateCategory[] = [
    {
      name: "Projeto",
    },
    {
      name: "Prática",
    },
    {
      name: "Recuperação",
    },
  ]
  const teachers: CreateTeacher[] = [
    {
      name: "Diego Pinho",
    },
    {
      name: "Bruna Hamori",
    },
  ]
  const disciplines: CreateDiscipline[] = [
    {
      name: "HTML e CSS",
      termId: 1,
    },
    {
      name: "JavaScript",
      termId: 2,
    },
    {
      name: "React",
      termId: 3,
    },
    {
      name: "Humildade",
      termId: 1,
    },
    {
      name: "Planejamento",
      termId: 2,
    },
    {
      name: "Autoconfiança",
      termId: 3,
    },
  ]
  const teachersDisciplines = [
    {
      teacherName: "Diego Pinho",
      disciplineName: "HTML e CSS",
    },
    {
      teacherName: "Diego Pinho",
      disciplineName: "JavaScript",
    },
    {
      teacherName: "Diego Pinho",
      disciplineName: "React",
    },
    {
      teacherName: "Bruna Hamori",
      disciplineName: "Humildade",
    },
    {
      teacherName: "Bruna Hamori",
      disciplineName: "Planejamento",
    },
    {
      teacherName: "Bruna Hamori",
      disciplineName: "Autoconfiança",
    },
  ]
  const tests: CreateTestData[] = [
    {
      name: "Teste 1",
      pdfUrl: "http://www.africau.edu/images/default/sample.pdf",
      categoryId: 1,
      disciplineId: 1,
      teacherId: 1,
    },
    {
      name: "Teste 2",
      pdfUrl: "http://www.africau.edu/images/default/sample.pdf",
      categoryId: 1,
      disciplineId: 4,
      teacherId: 2,
    },
    {
      name: "Teste 3",
      pdfUrl: "http://www.africau.edu/images/default/sample.pdf",
      categoryId: 1,
      disciplineId: 2,
      teacherId: 1,
    },
    {
      name: "Teste 4",
      pdfUrl: "http://www.africau.edu/images/default/sample.pdf",
      categoryId: 1,
      disciplineId: 5,
      teacherId: 2,
    },
    {
      name: "Teste 5",
      pdfUrl: "http://www.africau.edu/images/default/sample.pdf",
      categoryId: 1,
      disciplineId: 3,
      teacherId: 1,
    },
    {
      name: "Teste 6",
      pdfUrl: "http://www.africau.edu/images/default/sample.pdf",
      categoryId: 1,
      disciplineId: 6,
      teacherId: 2,
    },
    {
      name: "Teste 7",
      pdfUrl: "http://www.africau.edu/images/default/sample.pdf",
      categoryId: 2,
      disciplineId: 1,
      teacherId: 1,
    },
    {
      name: "Teste 8",
      pdfUrl: "http://www.africau.edu/images/default/sample.pdf",
      categoryId: 2,
      disciplineId: 4,
      teacherId: 2,
    },
    {
      name: "Teste 9",
      pdfUrl: "http://www.africau.edu/images/default/sample.pdf",
      categoryId: 2,
      disciplineId: 2,
      teacherId: 1,
    },
    {
      name: "Teste 10",
      pdfUrl: "http://www.africau.edu/images/default/sample.pdf",
      categoryId: 2,
      disciplineId: 5,
      teacherId: 2,
    },
  ]

  await prisma.term.createMany({ data: terms })
  await prisma.category.createMany({ data: categories })
  await prisma.teacher.createMany({ data: teachers })
  await prisma.discipline.createMany({ data: disciplines })

  Promise.all(
    teachersDisciplines.map((teacherDiscipline) => {
      return prisma.teacher.update({
        where: { name: teacherDiscipline.teacherName },
        data: {
          disciplines: { connect: { name: teacherDiscipline.disciplineName } },
        },
      })
    }),
  )

  await prisma.test.createMany({ data: tests })
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
