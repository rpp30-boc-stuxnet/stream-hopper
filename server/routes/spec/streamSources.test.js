const request = require('supertest');
const app = require('../../app.js');

describe("GET /api/streamSources", () => {
  describe("When a required query paramater is missing from request", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .get('/api/streamSources')
        .query({})

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the parameter that was missing", async () => {
      const response = await request(app)
        .get('/api/streamSources')
        .query({})

      expect(response.error.text).toStrictEqual(
        expect.stringContaining("Error: Must provide a valid")
      )
    })

  })

  describe("When the title is not found in TMDB's database", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .get('/api/streamSources')
        .query({
          type: 'movie',
          tmdb_id: 321654987654321
        })

      expect(response.statusCode).toBe(400)
    })

    test("Should return with a message indicating the title was not found in TMDB's database", async () => {
      const response = await request(app)
        .get('/api/streamSources')
        .query({
          type: 'movie',
          tmdb_id: 321654987654321
        })

      expect(response.error.text).toBe("Error: Could not find a matching title in Watchmode's database")
    })

  })

  describe("When the title is found in TMDB's database, but has no available streaming sources", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(app)
        .get('/api/streamSources')
        .query({
          type: 'movie',
          tmdb_id: 89394
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should return an empty array", async () => {
      const response = await request(app)
        .get('/api/streamSources')
        .query({
          type: 'movie',
          tmdb_id: 89394
        })

      expect(Array.isArray(response.body) && response.body.length === 0).toBe(true)
    })

  })

  describe("When the title is found in TMDB's database and has available streaming sources", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(app)
        .get('/api/streamSources')
        .query({
          type: 'movie',
          tmdb_id: 329
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should return an array of objects with at least one element", async () => {
      const response = await request(app)
        .get('/api/streamSources')
        .query({
          type: 'movie',
          tmdb_id: 329
        })

      let stringResponse = JSON.stringify(response.body)

      expect(Array.isArray(response.body) && response.body.length > 0 && stringResponse[0] === '[' && stringResponse[1] === '{').toBe(true)
    })

    test("Returned stream sources should have all expected properties", async () => {
      const response = await request(app)
        .get('/api/streamSources')
        .query({
          type: 'movie',
          tmdb_id: 329
        })

      let hasAllProperties = true;

      let expectedProperties = [
        'type',
        'region',
        'ios_url',
        'android_url',
        'web_url',
        'format',
        'price',
        'seasons',
        'episodes',
        'company_info'
      ]

      for (var i = 0; i < expectedProperties.length; i++) {
        if (response.body[0][expectedProperties[i]] === undefined) {
          hasAllProperties = false;
        }
      }

      expect(hasAllProperties).toBe(true)
    })

  })

})