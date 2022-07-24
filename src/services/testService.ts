import { CreateTestData } from "@/interfaces/testInterfaces"
import { queryFactory } from "@factories/queryFactory"
import { testRepository } from "@repositories/testRepository"
import { notFoundError } from "@utils/errorUtils"

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
}
