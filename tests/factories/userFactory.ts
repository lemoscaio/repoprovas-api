import { prisma } from "@config/database"
import { faker } from "@faker-js/faker"
import { encrypt } from "@utils/encryptFunctions"
import supertest from "supertest"

function createUserData(email = "test@email.com", passwordLength = 10) {
  const password = faker.internet.password(passwordLength)
  return {
    email: email,
    password,
    confirmPassword: password,
  }
}

async function createUser(data: { email: string; password: string }) {
  const hashPassword = encrypt.bcrypt.encryptPassword(data.password)

  const createdUser = await prisma.user.create({
    data: { email: data.email, password: hashPassword },
  })

  return createdUser
}

export const userFactory = {
  createUserData,
  createUser,
}
