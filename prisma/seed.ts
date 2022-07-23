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
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
