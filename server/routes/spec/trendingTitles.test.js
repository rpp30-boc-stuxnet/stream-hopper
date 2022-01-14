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

// HELPER FUNCTIONS

let checkForExpectedProperties = (responseBodyElem) => {
  let expectedProperties = [
    'type',
    'tmdb_id',
    'poster_path',
    'saved_by_user'
  ]

  let hasAllProperties = true;

  for (var i = 0; i < expectedProperties.length; i++) {
    if (responseBodyElem[expectedProperties[i]] === undefined) {
      hasAllProperties = false;
    }
  }

  return hasAllProperties;
}

// TESTS

describe("GET /api/trendingTitles", () => {
  describe("When a required query paramater is missing from request", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .get('/api/trendingTitles')
        .query({})

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the parameter that was missing", async () => {
      const response = await request(app)
        .get('/api/trendingTitles')
        .query({})

      expect(response.error.text).toStrictEqual(
        expect.stringContaining("Error: Must provide a valid")
      )
    })

  })

  describe("When all required query parameters are included in the request", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(app)
        .get('/api/trendingTitles')
        .query({
          user_id: "Test1"
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should respond with an array of objects that contain all of the expected properties", async () => {
      const response = await request(app)
        .get('/api/trendingTitles')
        .query({
          user_id: "Test1"
        })

      expect(checkForExpectedProperties(response.body[0])).toBe(true)
    })

  })

  describe("When the user has not saved one of the trending titles to their list", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(app)
        .get('/api/trendingTitles')
        .query({
          user_id: "Test1"
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should respond with an array of objects that contain all of the expected properties", async () => {
      const response = await request(app)
        .get('/api/trendingTitles')
        .query({
          user_id: "Test1"
        })

      expect(checkForExpectedProperties(response.body[0])).toBe(true)
    })

    test("Saved title should have a value of false on the 'saved_by_user' property", async () => {
      const response = await request(app)
        .get('/api/trendingTitles')
        .query({
          user_id: "Test1"
        })

      expect(response.body[0].saved_by_user).toBe(false)
    })

  })

  describe("When the user has saved one of the trending titles to their list", () => {
    test("Should respond with a 200 status code", async () => {
      const firstResponse = await request(app)
        .get('/api/trendingTitles')
        .query({
          user_id: "Test1"
        })

      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: "Test1",
          tmdb_id: firstResponse.body[0].tmdb_id,
          type: firstResponse.body[0].type
        })

      const secondResponse = await request(app)
        .get('/api/trendingTitles')
        .query({
          user_id: "Test1"
        })

      expect(secondResponse.statusCode).toBe(200)
    })

    test("Should respond with an array of objects that contain all of the expected properties", async () => {
      const firstResponse = await request(app)
        .get('/api/trendingTitles')
        .query({
          user_id: "Test2"
        })

      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: "Test2",
          tmdb_id: firstResponse.body[0].tmdb_id,
          type: firstResponse.body[0].type
        })

      const secondResponse = await request(app)
        .get('/api/trendingTitles')
        .query({
          user_id: "Test2"
        })

      expect(checkForExpectedProperties(secondResponse.body[0])).toBe(true)
    })

    test("Saved title should have a value of true on the 'saved_by_user' property", async () => {
      const firstResponse = await request(app)
        .get('/api/trendingTitles')
        .query({
          user_id: "Test2"
        })

      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: "Test2",
          tmdb_id: firstResponse.body[0].tmdb_id,
          type: firstResponse.body[0].type
        })

      const secondResponse = await request(app)
        .get('/api/trendingTitles')
        .query({
          user_id: "Test2"
        })

      expect(secondResponse.body[0].saved_by_user).toBe(true)
    })

  })

})