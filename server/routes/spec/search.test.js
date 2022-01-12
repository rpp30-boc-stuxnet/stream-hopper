const request = require('supertest');
const app = require('../../app.js');
const database = require("../../../database/index.js");

beforeAll(async () => {
  await database.connect();
  await database.drop();
})

afterAll(async () => {
  await database.disconnect();
})

describe("GET /api/search", () => {
  describe("When no 'title' search term is included in the query", () => {
    test("", async () => {

    })

    test("", async () => {

    })

  })

  describe("", () => {
    test("", async () => {

    })

    test("", async () => {

    })

  })

  describe("", () => {
    test("", async () => {

    })

    test("", async () => {

    })

  })

  describe("", () => {
    test("", async () => {

    })

    test("", async () => {

    })

  })

  describe("", () => {
    test("", async () => {

    })

    test("", async () => {

    })

  })

})