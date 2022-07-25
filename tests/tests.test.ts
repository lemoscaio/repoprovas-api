import { prisma } from "@config/database"
import supertest from "supertest"
import app from "../src/app"
import { testFactory } from "./factories/testFactory"
import { userFactory } from "./factories/userFactory"

const agent = supertest(app)
let token: string
let authorization: string

beforeAll(async () => {
  token = await userFactory.getToken()
  authorization = `Bearer ${token}`
})

describe("Authenticated routes test suit", () => {
  const testData = testFactory.createTestData()

  it("not given an authorization header with a valid token, should return 401", async () => {
    const result = await agent.post("/tests").send(testData)

    expect(result.statusCode).toBe(401)
  })

  it("given an authorization header with a invalid token, should return 401", async () => {
    const result = await agent
      .post("/tests")
      .set("Authorization", "Bearer veryRandomAndVeryWrongToken")
      .send(testData)

    expect(result.statusCode).toBe(401)
  })

  it("given an authorization header without 'Bearer ', should return 401", async () => {
    const result = await agent
      .post("/tests")
      .set("Authorization", token)
      .send(testData)

    expect(result.statusCode).toBe(401)
  })

  it("given an authorization header with 'Bearer ' but no token, should return 401", async () => {
    const result = await agent
      .post("/tests")
      .set("Authorization", "Bearer")
      .send(testData)

    expect(result.statusCode).toBe(401)
  })

  it("given a valid authorization header, should not return 401", async () => {
    const result = await agent
      .post("/tests")
      .set("Authorization", authorization)
      .send()

    expect(result.statusCode).not.toBe(401)
  })
})

describe("Test creation test suit", () => {
  const testData = testFactory.createTestData()

  it("given a right test data, it should return 201 and the created test data", async () => {
    const result = await agent
      .post("/tests")
      .set("Authorization", authorization)
      .send(testData)

    expect(result.statusCode).toBe(201)
    expect(result.body).toHaveProperty("id")
  })

  it("given a wrong data, it should return 422", async () => {
    const result = await agent
      .post("/tests")
      .set("Authorization", authorization)
      .send({ ...testData, pdfUrl: "www.google.com" })

    expect(result.statusCode).toBe(422)
  })

  it("given a wrong category id, it should return 404", async () => {
    const result = await agent
      .post("/tests")
      .set("Authorization", authorization)
      .send({ ...testData, categoryId: 100 })

    expect(result.statusCode).toBe(404)
  })

  it("given a wrong teacher id, it should return 404", async () => {
    const result = await agent
      .post("/tests")
      .set("Authorization", authorization)
      .send({ ...testData, teacherId: 100 })

    expect(result.statusCode).toBe(404)
  })

  it("given a wrong discipline id, it should return 404", async () => {
    const result = await agent
      .post("/tests")
      .set("Authorization", authorization)
      .send({ ...testData, disciplineId: 100 })

    expect(result.statusCode).toBe(404)
  })
})

describe("Find tests test suit", () => {
  it("given a right query string (disciplines), it should return a status of 200 and a list of tests", async () => {
    const result = await agent
      .get("/tests?groupBy=disciplines")
      .set("Authorization", authorization)
      .send()

    expect(result.statusCode).toBe(200)
    expect(typeof result.body).toBe("object")
    expect(result.body[0]).not.toBeFalsy
  })

  it("given a right query string (teachers), it should return a status of 200 and a list of tests", async () => {
    const result = await agent
      .get("/tests?groupBy=teachers")
      .set("Authorization", authorization)
      .send()

    expect(result.statusCode).toBe(200)
    expect(typeof result.body).toBe("object")
    expect(result.body[0]).not.toBeFalsy
  })

  it("given an empty query string in the route, it should return 422", async () => {
    const result = await agent
      .get("/tests")
      .set("Authorization", authorization)
      .send()

    expect(result.statusCode).toBe(422)
  })

  it("given a not valid query string in the route, it should return 422", async () => {
    const result = await agent
      .get("/tests?wrongQuery=disciplines")
      .set("Authorization", authorization)
      .send()

    expect(result.statusCode).toBe(422)
  })

  it("given a not valid query string value in the route, it should return 422", async () => {
    const result = await agent
      .get("/tests?groupBy=wrongValue")
      .set("Authorization", authorization)
      .send()

    expect(result.statusCode).toBe(422)
  })
})

afterAll(async () => {
  await prisma.$disconnect()
})
