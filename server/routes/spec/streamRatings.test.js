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

describe("GET /api/streamRatings", () => {
  describe("When a required query paramater is missing from request", () => {
    test("Should respond with a 400 status code", async () => {

    })

    test("Should responsd with a message indicating the parameter that was missing", async () => {

    })

  })

  describe("When a user has not rated a stream source, but others have", () => {
    test("Should respond with a 200 status code", async () => {

    })

    test("Should respond with an object that contains all of the expected properties", async () => {

    })

    test("Should return 'null' for each of the user's ratings", async () => {

    })

    test("Should return numeric values for each of the overall average ratings", async () => {

    })

    test("Should return at least 1 for the 'count_of_reviews' property", async () => {

    })

  })

  describe("When no users have rated a stream source", () => {
    test("Should respond with a 200 status code", async () => {

    })

    test("Should respond with an object that contains all of the expected properties", async () => {

    })

    test("Should return 'null' for all of the specific rating fields", async () => {

    })

    test("Should return 0 for the 'count_of_reviews' property", async () => {

    })

  })

  describe("When a user has rated a stream source", () => {
    test("Should respond with a 200 status code", async () => {

    })

    test("Should respond with an object that contains all of the expected properties", async () => {

    })

    test("Should return numeric values for all of the specific rating fields", async () => {

    })

    test("Should return at least 1 for the 'count_of_reviews' property", async () => {

    })

  })

})

describe("POST /api/streamRatings", () => {
  describe("When a required query paramater is missing from request", () => {
    test("Should respond with a 400 status code", async () => {

    })

    test("Should responsd with a message indicating the parameter that was missing", async () => {

    })

  })

  describe("When a user successfully submits source ratings", () => {
    test("Should respond with a 201 status code", async () => {

    })

    test("Should respond with a message confirming the save was successful", async () => {

    })

    test("Should change the overall stream source ratings in the database", async () => {

    })

})