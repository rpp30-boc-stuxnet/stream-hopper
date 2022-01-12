const request = require('supertest');
const app = require('../../app.js');

describe("GET /api/search", () => {
  describe("When the 'title' is missing from the request", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .get('/api/search')
        .query({})

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the 'title' parameter is required", async () => {
      const response = await request(app)
        .get('/api/search')
        .query({})

      expect(response.error.text).toBe("Error while fetching search results from TMDB API: query must be provided")
    })

  })

  describe("When the 'title' is missing from the request", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .get('/api/search')
        .query({
          title: ''
        })

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the 'title' parameter must have at least one character", async () => {
      const response = await request(app)
        .get('/api/search')
        .query({
          title: ''
        })

      expect(response.error.text).toBe("Error while fetching search results from TMDB API: query must be provided")
    })

  })

  describe("When the API finds matching titles", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(app)
        .get('/api/search')
        .query({
          title: 'Jurassic Park'
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should return an array with at least one element", async () => {
      const response = await request(app)
      .get('/api/search')
      .query({
        title: 'Jurassic Park'
      })

      expect(Array.isArray(response.body) && response.body.length > 0).toBe(true)
    })

    test("Should return results that include 'tmdb_id', 'type', 'title', 'release_date', and 'poster_path'", async () => {
      const response = await request(app)
      .get('/api/search')
      .query({
        title: 'Jurassic Park'
      })

      let res = response.body[0]

      expect(('tmdb_id' in res) && ('type' in res) && ('title' in res) && ('release_date' in res) && ('poster_path' in res)).toBe(true)
    })

  })

  describe("When the API doesn't find any matching titles", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(app)
        .get('/api/search')
        .query({
          title: 'sdgfasdgfsfdgw34tsfgsdfg'
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should return an empty array", async () => {
      const response = await request(app)
        .get('/api/search')
        .query({
          title: 'sdgfasdgfsfdgw34tsfgsdfg'
        })

      expect(Array.isArray(response.body) && response.body.length === 0).toBe(true)
    })

  })

})