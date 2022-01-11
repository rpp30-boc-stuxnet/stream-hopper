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

describe ("GET /api/savedTitles", () => {

  describe("Given a user_id", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(app)
        .get('/api/savedTitles')
        .query({user_id: 'Test1'})

      expect(response.statusCode).toBe(200);
    })

    test("Should return a valid response body", async () => {
      const response = await request(app)
        .get('/api/savedTitles')
        .query({user_id: 'Test1'})

      expect(response.body).toBeDefined()
    })
  })

  describe("When the user_id is missing from the request", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .get('/api/savedTitles')

      expect(response.statusCode).toBe(400);
    })

    test("Should respond with a message indicating the user_id field is required", async () => {
      const response = await request(app)
        .get('/api/savedTitles')

      expect(response.error.text).toBe('Error: Must provide a valid user_id (string) in the query parameters')
    })
  })

  describe("When the user has saved titles", () => {
    test("Should respond with an array having a length greater than zero", async () => {
      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test1',
          type: 'tv',
          tmdb_id: 46952
        })

      const response = await request(app)
        .get('/api/savedTitles')
        .query({user_id: 'Test1'})

      expect(Array.isArray(response.body) && response.body.length > 0).toBe(true);
    })
  })

  describe("When the user does not have any saved titles", () => {
    test("Should have an array with a length of zero", async () => {
      const response = await request(app)
        .get('/api/savedTitles')
        .query({user_id: 'Test2'})

      expect(Array.isArray(response.body) && response.body.length === 0).toBe(true);
    })
  })

});

