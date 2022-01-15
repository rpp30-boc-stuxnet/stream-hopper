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

let checkForExpectedProperties = (responseBodyElem, requestType) => {
  let expectedProperties;

  if (requestType === 'get') {
    expectedProperties = [
      'type',
      'tmdb_id'
    ]
  } else if (requestType === 'post') {
    expectedProperties = [
      'user_id',
      'username',
      'tmdb_id',
      'type',
      'review_body'
    ]
  }

  let hasAllProperties = true;

  for (var i = 0; i < expectedProperties.length; i++) {
    if (responseBodyElem[expectedProperties[i]] === undefined) {
      hasAllProperties = false;
    }
  }

  return hasAllProperties;
}

describe("GET /api/titleReviews", () => {
  describe("When a required query paramater is missing from request", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .get('/api/titleReviews')
        .query({})

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the parameter that was missing", async () => {
      const response = await request(app)
        .get('/api/titleReviews')
        .query({})

      expect(response.error.text).toStrictEqual(
        expect.stringContaining("Error: Must provide a valid")
      )
    })

  })

  describe("When a title doesn't have any saved reviews", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(app)
        .get('/api/titleReviews')
        .query({
          tmdb_id: 329,
          type: 'movie'
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should respond with an empty array", async () => {
      const response = await request(app)
        .get('/api/titleReviews')
        .query({
          tmdb_id: 329,
          type: 'movie'
        })

      expect(Array.isArray(response.body) && response.body.length === 0).toBe(true)
    })
  })

  describe("When a title does have saved reviews", () => {
      test("Should respond with a 200 status code", async () => {
        await request(app)
          .post('/api/titleReviews')
          .send({
            user_id: 'Test1',
            username: 'test123',
            tmdb_id: 329,
            type: 'movie',
            review_body: 'This was great!'
          })

        let response = await request(app)
          .get('/api/titleReviews')
          .query({
            type: 'movie',
            tmdb_id: 329
          })

        expect(response.statusCode).toBe(200)
      })

      test("Should respond with an array of objects that contain all of the expected properties", async () => {
        await request(app)
          .post('/api/titleReviews')
          .send({
            user_id: 'Test1',
            username: 'test123',
            tmdb_id: 330,
            type: 'movie',
            review_body: 'This was great!'
          })

        let response = await request(app)
          .get('/api/titleReviews')
          .query({
            type: 'movie',
            tmdb_id: 330
          })

        expect(Array.isArray(response.body) && checkForExpectedProperties(response.body[0], 'get')).toBe(true)
      })

  })

})

describe("POST /api/titleReviews", () => {
  describe("When a required body paramater is missing or invalid in the request", () => {
    test("Should respond with a 400 status code", async () => {
      let response = await request(app)
        .post('/api/titleReviews')
        .send({})

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the parameter that was missing", async () => {
      let response = await request(app)
        .post('/api/titleReviews')
        .send({})

        expect(response.error.text).toStrictEqual(
          expect.stringContaining("Error: Must provide a valid")
        )
    })

  })

  describe("When all of the required body parameters are valid in the request", () => {
    test("Should respond with a 201 status code", async () => {
      const response = await request(app)
        .post('/api/titleReviews')
        .send({
          user_id: 'Test2',
          username: 'test123',
          tmdb_id: 330,
          type: 'movie',
          review_body: 'This was great!'
        })

      expect(response.statusCode).toBe(201)
    })

    test("Should respond with a message confirming the review was saved successfully", async () => {
      const response = await request(app)
        .post('/api/titleReviews')
        .send({
          user_id: 'Test2',
          username: 'test123',
          tmdb_id: 331,
          type: 'movie',
          review_body: 'This was great!'
        })

        expect(response.text).toBe("Review saved successfully");
    })

    test("Should add the review to the database", async () => {
      await request(app)
        .post('/api/titleReviews')
        .send({
          user_id: 'Test3',
          username: 'test123',
          tmdb_id: 332,
          type: 'movie',
          review_body: 'This was great!'
        })

      const firstResponse = await request(app)
        .get('/api/titleReviews')
        .query({
          type: 'movie',
          tmdb_id: 332
        })

      await request(app)
      .post('/api/titleReviews')
      .send({
        user_id: 'Test3',
        username: 'test123',
        tmdb_id: 332,
        type: 'movie',
        review_body: 'This was great again!'
      })

      const secondResponse = await request(app)
        .get('/api/titleReviews')
        .query({
          user_id: 'Test',
          username: 'test123',
          tmdb_id: 332,
          type: 'movie',
          review_body: 'This was great!'
        })

        expect(secondResponse.body.length - firstResponse.body.length).toBe(1);
    })

  })

})