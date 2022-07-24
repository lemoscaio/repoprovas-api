import { testService } from "@services/testService"
import { Request, Response } from "express"

export async function insertTest(req: Request, res: Response) {
  console.log(req.body)

  const insertedTest = await testService.insertTest(req.body)

  res.status(201).send(insertedTest)
}
