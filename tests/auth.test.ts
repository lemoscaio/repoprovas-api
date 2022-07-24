import { prisma } from "@config/database"
import supertest from "supertest"
import app from "../src/app"
import { userFactory } from "./factories/userFactory"

const agent = supertest(app)
const userData = userFactory.createUserData()

describe("Sign-up test suite", () => {
  it("given a new user data, it should return 201 (as created)", async () => {
    const user = await agent.post("/sign-up").send(userData)

    expect(user.status).toBe(201)
  })

  it("given a repeated user email, it should return 409", async () => {
    const user = await agent.post("/sign-up").send(userData)

    expect(user.status).toBe(409)
  })

  it("given a bad user data (empty password), it should return 422", async () => {
    const userBadData = { ...userData, password: "" }
    const user = await agent.post("/sign-up").send(userBadData)

    expect(user.status).toBe(422)
  })
})

describe("Sign-in test suite", () => {
  it("given a right email and password, it should return 200", async () => {
    const user = await agent.post("/sign-in").send(userData)

    expect(user.status).toBe(200)
  })

  it("given a bad user data (empty password), it should return 422", async () => {
    const user = await agent.post("/sign-in").send(userData)

    expect(user.status).toBe(200)
  })

  it("given a wrong password, it should return 401", async () => {
    const userWithWrongPass = { ...userData, password: "wrongPassword" }
    const user = await agent.post("/sign-in").send(userWithWrongPass)

    expect(user.status).toBe(401)
  })

  it("given a wrong email, it should return 401", async () => {
    const userWithWrongEmail = { ...userData, email: "wrongEmail@test.com" }
    const user = await agent.post("/sign-in").send(userWithWrongEmail)

    expect(user.status).toBe(401)
  })
})

afterAll(async () => {
  await prisma.$disconnect()
})
