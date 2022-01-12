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

    test("Should respond with a message indicating the user_id parameter is required", async () => {
      const response = await request(app)
        .get('/api/savedTitles')

      expect(response.error.text).toBe('Error: Must provide a valid \'user_id\' (string) in the query parameters')
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

describe ("POST /api/savedTitles", () => {
  describe("When the 'user_id' body parameter is missing", () => {
    test("Should respond with with a 400 status code", async () => {
      const response = await request(app)
        .post('/api/savedTitles')
        .send({
          type: 'tv',
          tmdb_id: 46952
        })

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the 'user_id' parameter is required", async () => {
      const response = await request(app)
        .post('/api/savedTitles')
        .send({
          type: 'tv',
          tmdb_id: 46952
        })

      expect(response.error.text).toBe('Error: Must provide a valid \'user_id\' (string) in the body parameters')
    })
  })

  describe("When the 'type' body parameter is missing", () => {
    test("Should respond with with a 400 status code", async () => {
      const response = await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test1',
          tmdb_id: 46952
        })

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the 'type' parameter is required", async () => {
      const response = await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test1',
          tmdb_id: 46952
        })

      expect(response.error.text).toBe('Error: Must provide a valid \'type\' (string) in the body parameters')
    })
  })

  describe("When the 'tmdb_id' body parameter is missing", () => {
    test("Should respond with with a 400 status code", async () => {
      const response = await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test1',
          type: 'tv'
        })

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the 'tmdb_id' parameter is required", async () => {
      const response = await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test1',
          type: 'tv'
        })

      expect(response.error.text).toBe('Error: Must provide a valid \'tmdb_id\' (integer) in the body parameters')
    })
  })

  describe("When trying to save a title that can't be found in TMDB's database", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test1',
          type: 'tv',
          tmdb_id: 23409283409283409283409
        })

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the tmdb title could not be found", async () => {
      const response = await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test1',
          type: 'tv',
          tmdb_id: 23409283409283409283409
        })

      expect(response.error.text).toBe('Error while fetching tmdb id from tmdb\'s API: Could not find title in tmdb database')
    })
  })

  describe("when saving a title that already exists in the user's list", () => {
    test("Should respond with a 400 status code", async () => {
      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test2',
          type: 'tv',
          tmdb_id: 46952
        })

      const response = await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test2',
          type: 'tv',
          tmdb_id: 46952
        })

      expect(response.statusCode).toBe(400);
    })

    test("Should respond with a message indicating the title was already in the user's list", async () => {
      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test3',
          type: 'tv',
          tmdb_id: 46952
        })

      const response = await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test3',
          type: 'tv',
          tmdb_id: 46952
        })

      expect(response.error.text).toBe('Movie already exists in user\'s list');
    })
  })

  describe("When saving a valid title that isn't already in the user's list", () => {
    test("Should responsd with a 201 status code", async () => {
      const response = await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test4',
          type: 'tv',
          tmdb_id: 46952
        })

      expect(response.statusCode).toBe(201);
    })

    test("Should respond with a message confirming the title was saved", async () => {
      const response = await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test5',
          type: 'tv',
          tmdb_id: 46952
        })

      expect(response.text).toBe("Title added successfully");
    })

    test("Should save the title in the user's list", async () => {
      await request(app)
        .post('/api/savedTitles')
        .send({
          user_id: 'Test6',
          type: 'tv',
          tmdb_id: 46952
        })

      const response = await request(app)
        .get('/api/savedTitles')
        .query({user_id: 'Test6'})

      expect(response.body[0].tmdb_id).toBe(46952)
    })
  })

});

describe("DELETE /api/savedTitles", () => {
  describe("When the 'user_id' body parameter is missing", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .delete('/api/savedTitles')
        .send({
          tmdb_id: 46952
        })

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the 'user_id' parameter is required", async () => {
      const response = await request(app)
        .delete('/api/savedTitles')
        .send({
          tmdb_id: 46952
        })

      expect(response.error.text).toBe("Error: Must provide a valid 'user_id' (string) in the body parameters")
    })
  })

  describe("When the 'tmdb_id' body parameter is missing", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .delete('/api/savedTitles')
        .send({
          user_id: "Test6"
        })

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the 'tmdb_id' parameter is required", async () => {
      const response = await request(app)
        .delete('/api/savedTitles')
        .send({
          user_id: "Test6"
        })

      expect(response.error.text).toBe("Error: Must provide a valid 'tmdb_id' (integer) in the body parameters")
    })
  })

  // Scenario: "Title isn't in user's list"
    // Test: "Should respond with a 400 status code"
    // Test: "Should respond with a messaging indicating the title wasn't in the user's list"
  // Scenario: "Title is in user's list"
    // Test: "Should respond with a 200 status code"
    // Test: "Should remove the title from the user's list"
})
