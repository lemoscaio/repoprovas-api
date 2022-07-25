import { errorTypeToStatusCode, isAppError } from "@utils/errorUtils"
import { NextFunction, Request, Response } from "express"

export function handleError(
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log("An error occured!", error)

  if (isAppError(error)) {
    const statusCode = errorTypeToStatusCode(error.type)
    res.status(statusCode).send(error.message)
  }

  if (error.details)
    return res
      .status(422)
      .send(error.details.map(({ message }: { message: string }) => message))

  res.sendStatus(500)
}
