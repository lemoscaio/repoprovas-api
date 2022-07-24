export interface AppError {
  type: string
  message: string
}

export function isAppError(error: AppError) {
  return error.type !== undefined
}

export function errorTypeToStatusCode(errorType: string) {
  const types = {
    unauthorized: 401,
    notFound: 404,
    conflict: 409,
    wrongSchema: 422,
  }

  return types[errorType] || 400
}

export function notFoundError(message?: string) {
  return { type: "notFound", message }
}
export function unauthorizedError(message?: string) {
  return { type: "unauthorized", message }
}
export function conflictError(message?: string) {
  return { type: "conflict", message }
}
export function wrongSchemaError(message?: string) {
  return { type: "wrongSchema", message }
}
