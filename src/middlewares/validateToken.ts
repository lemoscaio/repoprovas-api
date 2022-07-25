import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import { unauthorizedError } from "@/utils/errorUtils"

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers
  const JWT_TOKEN = process.env.JWT_TOKEN
  const hasBearer = authorization?.match(/Bearer/)
  const token = authorization?.replace("Bearer", "").trim()

  if (!hasBearer)
    throw unauthorizedError(
      "Authorization header must have 'Bearer' at the beggining",
    )

  if (!token)
    throw unauthorizedError(
      "You must pass an authorization token in the request header",
    )

  try {
    const tokenData = JSON.stringify(jwt.verify(token, JWT_TOKEN))
    const parsedData: { email: string } = JSON.parse(tokenData)
    res.locals.user = { email: parsedData.email }
  } catch (error) {
    throw unauthorizedError("Wrong or expired token")
  }

  next()
}
