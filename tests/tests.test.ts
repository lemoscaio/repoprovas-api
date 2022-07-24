import { prisma } from "@config/database"
import supertest from "supertest"
import app from "../src/app"
import { testFactory } from "./factories/testFactory"

const agent = supertest(app)

describe("Tests test suit", () => {
  const testData = testFactory.createTestData()

  it("given a right test data, it should return 201 and the created test data", async () => {
    const result = await agent.post("/tests").send(testData)

    expect(result.statusCode).toBe(201)
    expect(result.body).toHaveProperty("id")
  })

  it("given a wrong data, it should return 422", async () => {
    const result = await agent
      .post("/tests")
      .send({ ...testData, pdfUrl: "www.google.com" })

    expect(result.statusCode).toBe(422)
  })

  it("given a wrong category id, it should return 404", async () => {
    const result = await agent
      .post("/tests")
      .send({ ...testData, categoryId: 100 })

    expect(result.statusCode).toBe(404)
  })

  it("given a wrong teacher id, it should return 404", async () => {
    const result = await agent
      .post("/tests")
      .send({ ...testData, teacherId: 100 })

    expect(result.statusCode).toBe(404)
  })

  it("given a wrong discipline id, it should return 404", async () => {
    const result = await agent
      .post("/tests")
      .send({ ...testData, disciplineId: 100 })

    expect(result.statusCode).toBe(404)
  })
})

afterAll(async () => {
  await prisma.$disconnect()
})
