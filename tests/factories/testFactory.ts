import { faker } from "@faker-js/faker"
import { CreateTestData } from "src/interfaces/testInterfaces"

export const testFactory = {
  createTestData(
    name = "Example test",
    pdfUrl = "http://www.africau.edu/images/default/sample.pdf",
    categoryId = 1,
    disciplineId = 1,
    teacherId = 1,
  ): CreateTestData {
    return {
      name,
      pdfUrl,
      categoryId,
      disciplineId,
      teacherId,
    }
  },
}
