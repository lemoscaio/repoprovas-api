import app from "@/app"
import { prisma } from "@config/database"
import { faker } from "@faker-js/faker"
import { encrypt } from "@utils/encryptFunctions"
import supertest from "supertest"

export const userFactory = {
  createUserData(email = "test@email.com", passwordLength = 10) {
    const password = faker.internet.password(passwordLength)
    return {
      email: email,
      password,
    }
  },

  async createUser(data: { email: string; password: string }) {
    const hashPassword = encrypt.bcrypt.encryptPassword(data.password)

    const createdUser = await prisma.user.create({
      data: { email: data.email, password: hashPassword },
    })

    return createdUser
  },

  async getToken(email = "newToken@test.com") {
    const userData = this.createUserData(email)
    await this.createUser(userData)

    const response = await supertest(app).post("/sign-in").send(userData)
    const token = response.body.token

    return token
  },
}
