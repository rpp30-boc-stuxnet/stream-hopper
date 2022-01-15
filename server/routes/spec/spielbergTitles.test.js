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

describe("GET /api/spielbergTitles", () => {
  describe("When the 'user_id' is missing from the request", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .get('/api/spielbergTitles')
        .query({})

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the 'user_id' parameter is required", async () => {
      const response = await request(app)
        .get('/api/spielbergTitles')
        .query({})

      expect(response.error.text).toBe("Error: Must provide a valid 'user_id' (string) in the query parameters")
    })

  })

  describe("When the user has saved a Spielberg title in their list" , () => {
    test("Should respond with a 200 status code", async () => {
      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test1',
          type: 'movie',
          tmdb_id: 329
        })

      let response = await request(app)
        .get('/api/spielbergTitles')
        .query({
          user_id: 'Test1'
        })

      expect(response.statusCode).toBe(200);
    })

    test("Should return an array with a length greater than zero", async () => {
      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test2',
          type: 'movie',
          tmdb_id: 329
        })

      let response = await request(app)
        .get('/api/spielbergTitles')
        .query({
          user_id: 'Test2'
        })

      expect(Array.isArray(response.body) && response.body.length > 0).toBe(true);
    })

    test("Should return 'saved_by_user' property as true for that title", async () => {
      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test3',
          type: 'movie',
          tmdb_id: 329
        })

      let response = await request(app)
        .get('/api/spielbergTitles')
        .query({
          user_id: 'Test3'
        })

      expect(response.body[0].saved_by_user).toBe(true);
    })

  })

  describe("When the user has not saved any Spielberg titles in their list" , () => {
    test("Should respond with a 200 status code", async () => {
      let response = await request(app)
        .get('/api/spielbergTitles')
        .query({
          user_id: 'Test4'
        })

      expect(response.statusCode).toBe(200);
    })

    test("Should return an array with a length greater than zero", async () => {
      let response = await request(app)
        .get('/api/spielbergTitles')
        .query({
          user_id: 'Test5'
        })

      expect(Array.isArray(response.body) && response.body.length > 0).toBe(true);
    })

    test("Should return 'saved_by_user' property as false for that title", async () => {
      let response = await request(app)
        .get('/api/spielbergTitles')
        .query({
          user_id: 'Test6'
        })

      expect(response.body[0].saved_by_user).toBe(false);
    })

  })

})