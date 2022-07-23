import Joi from "joi"

import { CreateUserBody } from "src/interfaces/userInterfaces"

export const newUserSchema = Joi.object<CreateUserBody>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
  confirmPassword: Joi.valid(Joi.ref("password")).required(),
})
