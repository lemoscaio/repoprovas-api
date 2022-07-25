import { Request, Response } from "express"

import * as userService from "@services/userService"

export async function registerUser(req: Request, res: Response) {
  const { email, password }: { email: string; password: string } = req.body

  const createdUser = await userService.registerUser({ email, password })

  createdUser.password = password

  res.status(201).send(createdUser)
}

export async function loginUser(req: Request, res: Response) {
  const { email, password }: { email: string; password: string } = req.body

  console.log(req.body)

  const token = await userService.loginUser({ email, password })

  res.status(200).send({ token })
}
