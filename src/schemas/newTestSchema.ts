import Joi, { number } from "joi"
import { CreateTestData } from "src/interfaces/testInterfaces"

export const newTestSchema = Joi.object<CreateTestData>({
  name: Joi.string().required(),
  pdfUrl: Joi.string()
    .pattern(/\.pdf$/i)
    .required(),
  categoryId: Joi.number().strict().required(),
  disciplineId: Joi.number().strict().required(),
  teacherId: Joi.number().strict().required(),
})
