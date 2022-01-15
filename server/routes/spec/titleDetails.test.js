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

let checkForExpectedProperties = (responseBody) => {
  let expectedProperties = [
    'title',
    'poster_path',
    'ratings',
    'run_time',
    'director',
    'synopsis',
    'type',
    'tmdb_id',
    'parental_rating',
    'release_date',
    'saved_by_user'
  ]

  let hasAllProperties = true;

  for (var i = 0; i < expectedProperties.length; i++) {
    if (responseBody[expectedProperties[i]] === undefined) {
      hasAllProperties = false;
    }
  }

  return hasAllProperties;
}

// TESTS

describe("GET /api/titleDetails", () => {
  describe("When a required query paramater is missing from request", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .get('/api/titleDetails')
        .query({})

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the parameter that was missing", async () => {
      const response = await request(app)
        .get('/api/titleDetails')
        .query({})

      expect(response.error.text).toStrictEqual(
        expect.stringContaining("Error: Must provide a valid")
      )
    })

  })

  describe("When a title isn't found in TMDB's database", () => {
    test("Should return a 400 status code", async () => {
      const response = await request(app)
        .get('/api/titleDetails')
        .query({
          tmdb_id: 32946546987987654,
          type: 'movie',
          user_id: 'Test1'
        })

      expect(response.statusCode).toBe(400)
    })

    test("Should return an empty object", async () => {
      const response = await request(app)
        .get('/api/titleDetails')
        .query({
          tmdb_id: 32946546987987654,
          type: 'movie',
          user_id: 'Test1'
        })

      expect(JSON.stringify(response.body)).toBe('{}')
    })

  })

  describe("When a title is found in TMDB's database", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(app)
        .get('/api/titleDetails')
        .query({
          tmdb_id: 329,
          type: 'movie',
          user_id: 'Test1'
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should return an object with all of the expected properties", async () => {
      const response = await request(app)
        .get('/api/titleDetails')
        .query({
          tmdb_id: 329,
          type: 'movie',
          user_id: 'Test1'
        })

      expect(checkForExpectedProperties(response.body)).toBe(true)
    })

  })

  describe("When a user has not saved the title to their list", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(app)
        .get('/api/titleDetails')
        .query({
          tmdb_id: 329,
          type: 'movie',
          user_id: 'Test1'
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should return an object with all of the expected properties", async () => {
      const response = await request(app)
        .get('/api/titleDetails')
        .query({
          tmdb_id: 329,
          type: 'movie',
          user_id: 'Test1'
        })

      expect(checkForExpectedProperties(response.body)).toBe(true)
    })

    test("Should return a value of false for the user_has_saved property", async () => {
      const response = await request(app)
        .get('/api/titleDetails')
        .query({
          tmdb_id: 329,
          type: 'movie',
          user_id: 'Test1'
        })

      expect(response.body.saved_by_user).toBe(false)
    })
  })

  describe("When a user has saved the title to their list", () => {
    test("Should respond with a 200 status code", async () => {
      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test2',
          type: 'movie',
          tmdb_id: 329
        })

      const response = await request(app)
        .get('/api/titleDetails')
        .query({
          tmdb_id: 329,
          type: 'movie',
          user_id: 'Test2'
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should return an object with all of the expected properties", async () => {
      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test3',
          type: 'movie',
          tmdb_id: 329
        })


      const response = await request(app)
        .get('/api/titleDetails')
        .query({
          tmdb_id: 329,
          type: 'movie',
          user_id: 'Test3'
        })

      expect(checkForExpectedProperties(response.body)).toBe(true)
    })

    test("Should return a value of true for the user_has_saved property", async () => {
      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test3',
          type: 'movie',
          tmdb_id: 329
        })


      const response = await request(app)
        .get('/api/titleDetails')
        .query({
          tmdb_id: 329,
          type: 'movie',
          user_id: 'Test3'
        })

      expect(response.body.saved_by_user).toBe(true)
    })
  })

})