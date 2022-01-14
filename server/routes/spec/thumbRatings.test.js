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
    'user_id',
    'tmdb_id',
    'user_thumb_rating',
    'overall_thumbs_ups',
    'overall_thumbs_downs'
  ]

  let hasAllProperties = true;

  for (var i = 0; i < expectedProperties.length; i++) {
    if (responseBody[expectedProperties[i]] === undefined) {
      hasAllProperties = false;
    }
  }

  return hasAllProperties;
}

let checkForExpectedValues = (responseBody, expectedUserRating, expectedOverallRatingCount) => {
  let totalRatings = responseBody.overall_thumbs_ups + responseBody.overall_thumbs_downs;

  if (responseBody.user_thumb_rating === expectedUserRating && totalRatings === expectedOverallRatingCount) {
    return true;
  } else {
    return false;
  }
}

// TESTS
describe("GET /api/thumbRatings", () => {
  describe("When a required query paramater is missing from request", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .get('/api/thumbRatings')
        .query({})

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the parameter that was missing", async () => {
      const response = await request(app)
        .get('/api/thumbRatings')
        .query({})

      expect(response.error.text).toStrictEqual(
        expect.stringContaining("Error: Must provide a valid")
      )
    })

  })

  describe("When a title has no thumb ratings", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: '123098sdflkj',
          tmdb_id: 123098234098234098234098
        })

        expect(response.statusCode).toBe(200)
    })

    test("Should return an object with all of the expected properties", async () => {
      const response = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: '123098sdflkj',
          tmdb_id: 123098234098234098234098
        })

        expect(checkForExpectedProperties(response.body)).toBe(true)
    })

    test("Should respond with a user rating of null, and overall thumbs_up and thumbs_down ratings of 0", async () => {
      const response = await request(app)
      .get('/api/thumbRatings')
      .query({
        user_id: '123098sdflkj',
        tmdb_id: 123098234098234098234098
      })

      expect(checkForExpectedValues(response.body, null, 0)).toBe(true)
    })

  })

  describe("When the user has not rated the title, but other users have", () => {
    test("Should respond with a 200 status code", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: "Test1",
          tmdb_id: 123,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let response = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: "Test2",
          tmdb_id: 123
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should return an object with all of the expected properties", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: "Test1",
          tmdb_id: 1234,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let response = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: "Test2",
          tmdb_id: 1234
        })

      expect(checkForExpectedProperties(response.body)).toBe(true)
    })

    test("Should respond with a user rating of null, but overall thumbs_up and thumbs_down ratings totaling at least 1", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: "Test1",
          tmdb_id: 12345,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let response = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: "Test2",
          tmdb_id: 12345
        })

      expect(checkForExpectedValues(response.body, null, 1)).toBe(true)
    })

  })

  describe("When the user has rated the title, but no other users have", () => {
    test("Should respond with a 200 status code", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: "Test3",
          tmdb_id: 321,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let response = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: "Test3",
          tmdb_id: 321
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should return an object with all of the expected properties", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: "Test3",
          tmdb_id: 3210,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let response = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: "Test3",
          tmdb_id: 3210
        })

      expect(checkForExpectedProperties(response.body)).toBe(true)
    })

    test("Should respond with a user rating of 'up' or 'down', and overall thumbs_up and thumbs_down ratings totaling exactly 1", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: "Test3",
          tmdb_id: 43210,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let response = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: "Test3",
          tmdb_id: 43210
        })

      expect(checkForExpectedValues(response.body, 'up', 1)).toBe(true)
    })

  })

  describe("When the user has rated the title, and other users have as well", () => {
    test("Should respond with a 200 status code", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: "Test5",
          tmdb_id: 789456123,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: "Test6",
          tmdb_id: 789456123,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let response = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: "Test6",
          tmdb_id: 789456123
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should return an object with all of the expected properties", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: "Test5",
          tmdb_id: 8789456123,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: "Test6",
          tmdb_id: 8789456123,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let response = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: "Test6",
          tmdb_id: 8789456123
        })

      expect(checkForExpectedProperties(response.body)).toBe(true)
    })

    test("Should respond with a user rating of 'up' or 'down', and overall thumbs_up and thumbs_down ratings totaling at least 2", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: "Test5",
          tmdb_id: 98789456123,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: "Test6",
          tmdb_id: 98789456123,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let response = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: "Test6",
          tmdb_id: 98789456123
        })

      expect(checkForExpectedValues(response.body, 'up', 2)).toBe(true)
    })

  })

})

describe("POST /api/thumbRatings", () => {
  describe("When a required body paramater is missing from request", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .post('/api/thumbRatings')
        .send({})

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the parameter that was missing", async () => {
      const response = await request(app)
        .post('/api/thumbRatings')
        .send({})

      expect(response.error.text).toStrictEqual(
        expect.stringContaining("Error: Must provide a valid")
      )
    })

  })

  describe("When the user submits a thumb review for the first time on a title", () => {
    test("Should respond with a 201 status code", async () => {
      let response = await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 1,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      expect(response.statusCode).toBe(201)
    })

    test("Should respond with a message confirming the save was successful", async () => {
      let response = await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 11,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      expect(response.text).toBe("Thumb rating saved successfully")
    })

    test("Should update the user's rating in the database to match what was submitted", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 111,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let response = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 111
        })

      expect(response.body.user_thumb_rating).toBe('up')
    })

    test("Should increase the total thumb ratings in the database by one", async () => {
      let firstResponse = await request(app)
      .get('/api/thumbRatings')
      .query({
        user_id: 'Test1',
        tmdb_id: 1111
      })

      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 1111,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let secondResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 1111
        })

      let firstTotalThumbs = firstResponse.body.overall_thumbs_ups + firstResponse.body.overall_thumbs_downs;
      let secondTotalThumbs = secondResponse.body.overall_thumbs_ups + firstResponse.body.overall_thumbs_downs;
      let totalThumbsDiff = secondTotalThumbs - firstTotalThumbs

      expect(totalThumbsDiff).toBe(1)
    })

  })

  describe("When the user changes their thumb rating from up to down", () => {
    test("Should respond with a 201 status code", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 2,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let response = await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 2,
          prev_thumb_rating: 'up',
          new_thumb_rating: 'down'
        })

      expect(response.statusCode).toBe(201)
    })

    test("Should respond with a message confirming the save was successful", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 22,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let response = await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 22,
          prev_thumb_rating: 'up',
          new_thumb_rating: 'down'
        })

      expect(response.text).toBe("Thumb rating saved successfully")
    })

    test("Should update the user's rating in the database to 'down'", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 222,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 222,
          prev_thumb_rating: 'up',
          new_thumb_rating: 'down'
        })

      let response = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 222
        })

      expect(response.body.user_thumb_rating).toBe("down")

    })

    test("Should increase the overall_thumbs_downs for the title by one", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 2222,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let firstResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 2222
        })

      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 2222,
          prev_thumb_rating: 'up',
          new_thumb_rating: 'down'
        })

      let secondResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 2222
        })

      let diffInThumbsDowns = secondResponse.body.overall_thumbs_downs - firstResponse.body.overall_thumbs_downs

      expect(diffInThumbsDowns).toBe(1)
    })

    test("Should decrease the overall_thumbs_ups for the title by one", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 22222,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let firstResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 22222
        })

      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 22222,
          prev_thumb_rating: 'up',
          new_thumb_rating: 'down'
        })

      let secondResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 22222
        })

      let diffInThumbsUps = secondResponse.body.overall_thumbs_ups - firstResponse.body.overall_thumbs_ups

      expect(diffInThumbsUps).toBe(-1)
    })

    test("Should not increase or decrease the total thumb ratings for the title", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 222222,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let firstResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 222222
        })

      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 222222,
          prev_thumb_rating: 'up',
          new_thumb_rating: 'down'
        })

      let secondResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 222222
        })

      let firstTotalThumbs = firstResponse.body.overall_thumbs_ups + firstResponse.body.overall_thumbs_downs;
      let secondTotalThumbs = secondResponse.body.overall_thumbs_ups + secondResponse.body.overall_thumbs_downs;
      let diffInTotalThumbs = secondTotalThumbs - firstTotalThumbs

      expect(diffInTotalThumbs).toBe(0)
    })

  })

  describe("When the user changes their thumb rating from down to up", () => {
    test("Should respond with a 201 status code", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 3,
          prev_thumb_rating: null,
          new_thumb_rating: 'down'
        })

      let response = await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 3,
          prev_thumb_rating: 'down',
          new_thumb_rating: 'up'
        })

      expect(response.statusCode).toBe(201)
    })

    test("Should respond with a message confirming the save was successful", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 33,
          prev_thumb_rating: null,
          new_thumb_rating: 'down'
        })

      let response = await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 33,
          prev_thumb_rating: 'down',
          new_thumb_rating: 'up'
        })

      expect(response.text).toBe("Thumb rating saved successfully")
    })

    test("Should update the user's rating in the database to 'up'", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 333,
          prev_thumb_rating: null,
          new_thumb_rating: 'down'
        })

      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 333,
          prev_thumb_rating: 'down',
          new_thumb_rating: 'up'
        })

      let response = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 333
        })

      expect(response.body.user_thumb_rating).toBe("up")
    })

    test("Should decrease the overall_thumbs_downs for the title by one", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 3333,
          prev_thumb_rating: null,
          new_thumb_rating: 'down'
        })

      let firstResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 3333
        })

      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 3333,
          prev_thumb_rating: 'down',
          new_thumb_rating: 'up'
        })

      let secondResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 3333
        })

      let diffInThumbsDowns = secondResponse.body.overall_thumbs_downs - firstResponse.body.overall_thumbs_downs

      expect(diffInThumbsDowns).toBe(-1)
    })

    test("Should increase the overall_thumbs_ups for the title by one", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 33333,
          prev_thumb_rating: null,
          new_thumb_rating: 'down'
        })

      let firstResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 33333
        })

      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 33333,
          prev_thumb_rating: 'down',
          new_thumb_rating: 'up'
        })

      let secondResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 33333
        })

      let diffInThumbsUps = secondResponse.body.overall_thumbs_ups - firstResponse.body.overall_thumbs_ups

      expect(diffInThumbsUps).toBe(1)
    })

    test("Should not increase or decrease the total thumb ratings for the title", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 333333,
          prev_thumb_rating: null,
          new_thumb_rating: 'down'
        })

      let firstResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 333333
        })

      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 333333,
          prev_thumb_rating: 'down',
          new_thumb_rating: 'up'
        })

      let secondResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 333333
        })

      let firstTotalThumbs = firstResponse.body.overall_thumbs_ups + firstResponse.body.overall_thumbs_downs;
      let secondTotalThumbs = secondResponse.body.overall_thumbs_ups + secondResponse.body.overall_thumbs_downs;
      let diffInTotalThumbs = secondTotalThumbs - firstTotalThumbs

      expect(diffInTotalThumbs).toBe(0)
    })

  })

  describe("When a POST request is sent with equal (non-null) values for prev_thumb_rating and new_thumb_rating", () => {
    test("Should respond with a 201 status code", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 4,
          prev_thumb_rating: null,
          new_thumb_rating: 'down'
        })

      let response = await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 4,
          prev_thumb_rating: 'down',
          new_thumb_rating: 'down'
        })

      expect(response.statusCode).toBe(201)
    })

    test("Should respond with a message confirming the save was successful", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 44,
          prev_thumb_rating: null,
          new_thumb_rating: 'down'
        })

      let response = await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 44,
          prev_thumb_rating: 'down',
          new_thumb_rating: 'down'
        })

      expect(response.text).toBe("Thumb rating saved successfully")
    })

    test("Should update the user's rating in the database to null", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 444,
          prev_thumb_rating: null,
          new_thumb_rating: 'down'
        })

      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 444,
          prev_thumb_rating: 'down',
          new_thumb_rating: 'down'
        })

      let response = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 444
        })

      expect(response.body.user_thumb_rating).toBe(null)
    })

    test("Should decrease the total thumb ratings for the title by one", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 444444,
          prev_thumb_rating: null,
          new_thumb_rating: 'down'
        })

      let firstResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 444444
        })

      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 444444,
          prev_thumb_rating: 'down',
          new_thumb_rating: 'down'
        })

      let secondResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 444444
        })

      let firstTotalThumbs = firstResponse.body.overall_thumbs_ups + firstResponse.body.overall_thumbs_downs;
      let secondTotalThumbs = secondResponse.body.overall_thumbs_ups + secondResponse.body.overall_thumbs_downs;
      let diffInTotalThumbs = secondTotalThumbs - firstTotalThumbs

      expect(diffInTotalThumbs).toBe(-1)
    })

  })

  describe("When a POST request is sent with equal null values for prev_thumb_rating and new_thumb_rating", () => {
    test("Should respond with a 201 status code", async () => {
      let response = await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 5,
          prev_thumb_rating: null,
          new_thumb_rating: null
        })

      expect(response.statusCode).toBe(201)
    })

    test("Should respond with a message confirming the save was successful", async () => {
      let response = await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 55,
          prev_thumb_rating: null,
          new_thumb_rating: null
        })

      expect(response.text).toBe("Thumb rating saved successfully")
    })

    test("Should save the user's rating in the database as null", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 555,
          prev_thumb_rating: null,
          new_thumb_rating: null
        })

      let response = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 555
        })

      expect(response.body.user_thumb_rating).toBe(null)
    })

    test("Should not increase or decrease the total thumb ratings for the title", async () => {
      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test2',
          tmdb_id: 555555,
          prev_thumb_rating: null,
          new_thumb_rating: 'up'
        })

      let firstResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 555555
        })

      await request(app)
        .post('/api/thumbRatings')
        .send({
          user_id: 'Test1',
          tmdb_id: 555555,
          prev_thumb_rating: null,
          new_thumb_rating: null
        })

      let secondResponse = await request(app)
        .get('/api/thumbRatings')
        .query({
          user_id: 'Test1',
          tmdb_id: 555555
        })

      let firstTotalThumbs = firstResponse.body.overall_thumbs_ups + firstResponse.body.overall_thumbs_downs;
      let secondTotalThumbs = secondResponse.body.overall_thumbs_ups + secondResponse.body.overall_thumbs_downs;
      let diffInTotalThumbs = secondTotalThumbs - firstTotalThumbs

      expect(diffInTotalThumbs).toBe(0)
    })

  })


})