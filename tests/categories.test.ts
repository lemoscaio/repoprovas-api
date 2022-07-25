import app from "@/app"
import supertest from "supertest"
import { userFactory } from "./factories/userFactory"

const agent = supertest(app)
let token: string
let authorization: string

beforeAll(async () => {
  token = await userFactory.getToken("categories@tests.com")
  authorization = `Bearer ${token}`
})

describe("Find categories test suit", () => {
  it("it should return a status of 200 and a object with a list of categories", async () => {
    const result = await agent
      .get("/categories")
      .set("Authorization", authorization)
      .send()

    expect(result.statusCode).toBe(200)
    expect(result.body).toHaveProperty("categories")
  })
})
