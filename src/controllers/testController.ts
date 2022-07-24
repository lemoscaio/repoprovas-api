import { testService } from "@services/testService"
import { Request, Response } from "express"

export async function insertTest(req: Request, res: Response) {
  const insertedTest = await testService.insertTest(req.body)

  res.status(201).send(insertedTest)
}

export async function findAllTestsByTag(req: Request, res: Response) {
  const groupBy = req.query.groupBy

  const tests = await testService.findAllTestsByTag(groupBy as string)

  res.send(tests)
}
