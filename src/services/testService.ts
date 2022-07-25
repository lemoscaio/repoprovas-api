import { CreateTestData } from "@/interfaces/testInterfaces"
import { queryFactory } from "@factories/queryFactory"
import { testRepository } from "@repositories/testRepository"
import { notFoundError, wrongSchemaError } from "@utils/errorUtils"

export const testService = {
  async insertTest(data: CreateTestData) {
    const foundDiscipline = await queryFactory.findById(
      "Discipline",
      data.disciplineId,
    )
    const foundTeacher = await queryFactory.findById("Teacher", data.teacherId)
    const foundCategory = await queryFactory.findById(
      "Category",
      data.categoryId,
    )

    if (!foundDiscipline) throw notFoundError("Invalid discipline id")
    if (!foundTeacher) throw notFoundError("Invalid teacher id")
    if (!foundCategory) throw notFoundError("Invalid category id")

    const insertedTest = await testRepository.insertTest(data)

    return insertedTest
  },
  async findAllTestsByTag(groupBy: string) {
    const groupByOptions = {
      disciplines: testRepository.findAllTestsByTermAndDiscipline(),
      teachers: testRepository.findAllTestsByTermAndTeachers(),
    }

    if (!groupBy) throw wrongSchemaError(`You must pass a valid query string.`)
    if (!groupByOptions[groupBy])
      throw wrongSchemaError(
        `You must pass a valid query string. ${groupBy} is not a valid query`,
      )

    const tests = await groupByOptions[groupBy]

    return tests
  },
}
