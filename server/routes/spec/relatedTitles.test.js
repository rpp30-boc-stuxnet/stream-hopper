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

describe("GET /api/relatedTitles", () => {
  describe("When the user_id is missing from the request", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .get('/api/relatedTitles')
        .query({})

      expect(response.statusCode).toBe(400);
    })

    test("Should respond with a message indicating the user_id parameter is required", async () => {
      const response = await request(app)
        .get('/api/relatedTitles')
        .query({})

      expect(response.error.text).toBe("Error: Must provide a valid 'user_id' (string) in the body parameters")
    })

  })

  describe("When the user does not have any saved titles", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(app)
        .get('/api/relatedTitles')
        .query({
          user_id: "Test1"
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should return an array with a single element of null", async () => {
      const response = await request(app)
        .get('/api/relatedTitles')
        .query({
          user_id: "Test1"
        })

      expect(Array.isArray(response.body) && response.body[0] === null).toBe(true);
    })

  })

  describe("When the user has saved titles", () => {
    test("Should return a 200 status code", async () => {
      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: "Test1",
          type: "tv",
          tmdb_id: 46952
        })

      const response = await request(app)
        .get('/api/relatedTitles')
        .query({
          user_id: "Test1"
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should return an array with at least one related title", async () => {
      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: "Test2",
          type: "tv",
          tmdb_id: 46952
        })

      const response = await request(app)
        .get('/api/relatedTitles')
        .query({
          user_id: "Test2"
        })

      expect(Array.isArray(response.body) && response.body.length > 0).toBe(true);
    })

    test("Returned related titles should contain 'type', 'tmdb_id', 'poster_path', and 'saved_by_user' properties", async () => {
      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: "Test3",
          type: "tv",
          tmdb_id: 46952
        })

      const response = await request(app)
        .get('/api/relatedTitles')
        .query({
          user_id: "Test3"
        })

      let firstTitle = response.body[0];
      expect(firstTitle.type && firstTitle.tmdb_id && firstTitle.poster_path && firstTitle.saved_by_user !== undefined).toBe(true);
    })

  })

  describe("When the user has a title in their list and then saves another one", () => {
    test("Should return a 200 status code", async () => {
      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: "Test4",
          type: "tv",
          tmdb_id: 46952
        })

      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: "Test4",
          type: "tv",
          tmdb_id: 2778
        })

      const response = await request(app)
        .get('/api/relatedTitles')
        .query({
          user_id: "Test4"
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should return a different list of related titles", async () => {
      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: "Test5",
          type: "tv",
          tmdb_id: 46952
        })

      const firstResponse = await request(app)
        .get('/api/relatedTitles')
        .query({
          user_id: "Test5"
        })

      let firstList = JSON.stringify(firstResponse.body)

      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: "Test5",
          type: "tv",
          tmdb_id: 2778
        })

      const secondResponse = await request(app)
        .get('/api/relatedTitles')
        .query({
          user_id: "Test5"
        })

      let secondList = JSON.stringify(secondResponse.body)

      expect(secondList).not.toBe(firstList)
    })

  })

})