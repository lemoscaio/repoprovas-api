import { prisma } from "@config/database"
import supertest from "supertest"
import app from "../src/app"
import { userFactory } from "./factories/userFactory"

const agent = supertest(app)

describe("Auth test suite", () => {
  const userData = userFactory.createUserData()
  const { confirmPassword, ...loginData } = userData

  it("given a new user data, it should return 201 (as created)", async () => {
    const user = await agent.post("/sign-up").send(userData)

    expect(user.status).toBe(201)
  })

  it("given a bad user data (empty password), it should return 422", async () => {
    const userBadData = { ...userData, password: "" }
    const user = await agent.post("/sign-up").send(userBadData)

    expect(user.status).toBe(422)
  })

  it("given a bad user data (not matching passwords), it should return 422", async () => {
    const userBadData = {
      ...userData,
      password: "0123456789",
      confirmPassword: "9876543210",
    }
    const user = await agent.post("/sign-up").send(userBadData)

    expect(user.status).toBe(422)
  })

  it("given a right email and password, it should return 200", async () => {
    const user = await agent.post("/sign-in").send(loginData)

    expect(user.status).toBe(200)
  })

  it("given a wrong password, it should return 401", async () => {
    const userWithWrongPass = { ...loginData, password: "wrongPassword" }
    const user = await agent.post("/sign-in").send(userWithWrongPass)

    expect(user.status).toBe(401)
  })

  it("given a wrong email, it should return 401", async () => {
    const userWithWrongEmail = { ...loginData, email: "wrongEmail@test.com" }
    const user = await agent.post("/sign-in").send(userWithWrongEmail)

    expect(user.status).toBe(401)
  })
})

afterAll(async () => {
  await prisma.$disconnect()
})
