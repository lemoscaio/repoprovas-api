import Joi from "joi"

import { CreateUserData } from "src/interfaces/userInterfaces"

export const loginSchema = Joi.object<CreateUserData>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
})
