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

describe("GET /api/streamRatings", () => {
  describe("When a required query paramater is missing from request", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .get('/api/streamRatings')
        .query({})

      expect(response.statusCode).toBe(400)
    })

    test("Should respond with a message indicating the parameter that was missing", async () => {
      const response = await request(app)
        .get('/api/streamRatings')
        .query({})

      expect(response.error.text).toStrictEqual(
        expect.stringContaining("Error: Must provide a valid")
      )
    })

  })

  describe("When a user has not rated a stream source, but others have", () => {
    test("Should respond with a 200 status code", async () => {
      await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test1",
          title_type: "tv",
          tmdb_id: 12345,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 3,
          user_video_quality_rating: 3,
          user_stream_reliability_rating: 3
        })

      const response = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test2",
          title_type: "tv",
          tmdb_id: 12345,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should respond with an object that contains all of the expected properties", async () => {
      await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test3",
          title_type: "tv",
          tmdb_id: 12345,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 3,
          user_video_quality_rating: 3,
          user_stream_reliability_rating: 3
        })

      const response = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test4",
          title_type: "tv",
          tmdb_id: 12345,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

      let responseFields = [
        'user_id',
        'tmdb_id',
        'source_company_id',
        'stream_type',
        'stream_format',
        'user_audio_quality_rating',
        'user_video_quality_rating',
        'user_stream_reliability_rating',
        'audio_average_rating',
        'video_average_rating',
        'reliability_average_rating',
        'count_of_reviews'
      ]

      let fieldMissing = false;

      for (var i = 0; i < responseFields.length; i++) {
        if (response.body[responseFields[i]] === undefined) {
          fieldMissing = true;
          break;
        }
      }

      expect(fieldMissing).toBe(false)
    })

    test("Should return 'null' for each of the user's ratings", async () => {
      await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test5",
          title_type: "tv",
          tmdb_id: 12345,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 3,
          user_video_quality_rating: 3,
          user_stream_reliability_rating: 3
        })

      const response = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test6",
          title_type: "tv",
          tmdb_id: 12345,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

      let userRatingFields = [
        'user_audio_quality_rating',
        'user_video_quality_rating',
        'user_stream_reliability_rating',
      ]

      let userRatingExists = false;

      for (var i = 0; i < userRatingFields.length; i++) {
        if (response.body[userRatingFields[i]] !== null) {
          userRatingExists = true;
          break;
        }
      }

      expect(userRatingExists).toBe(false)

    })

    test("Should return numeric values for each of the overall average ratings", async () => {
      await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test7",
          title_type: "tv",
          tmdb_id: 12345,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 3,
          user_video_quality_rating: 3,
          user_stream_reliability_rating: 3
        })

      const response = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test8",
          title_type: "tv",
          tmdb_id: 12345,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

      let overallRatingFields = [
        'audio_average_rating',
        'video_average_rating',
        'reliability_average_rating'
      ]

      let overallRatingsExist = true;

      for (var i = 0; i < overallRatingFields.length; i++) {
        if (response.body[overallRatingFields[i]] > 0) {
          userRatingExists = true;
        } else {
          userRatingExists = false;
          break;
        }
      }

      expect(userRatingExists).toBe(true)
    })

    test("Should return at least 1 for the 'count_of_reviews' property", async () => {
      await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test9",
          title_type: "tv",
          tmdb_id: 12345,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 3,
          user_video_quality_rating: 3,
          user_stream_reliability_rating: 3
        })

      const response = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test10",
          title_type: "tv",
          tmdb_id: 12345,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

      let hasReviews = (response.body.count_of_reviews > 0)

      expect(hasReviews).toBe(true)
    })

  })

  describe("When no users have rated a stream source", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test10",
          title_type: "tv",
          tmdb_id: 123456,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should respond with an object that contains all of the expected properties", async () => {
      const response = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test4",
          title_type: "tv",
          tmdb_id: 123456,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

      let responseFields = [
        'user_id',
        'tmdb_id',
        'source_company_id',
        'stream_type',
        'stream_format',
        'user_audio_quality_rating',
        'user_video_quality_rating',
        'user_stream_reliability_rating',
        'audio_average_rating',
        'video_average_rating',
        'reliability_average_rating',
        'count_of_reviews'
      ]

      let fieldMissing = false;

      for (var i = 0; i < responseFields.length; i++) {
        if (response.body[responseFields[i]] === undefined) {
          fieldMissing = true;
          break;
        }
      }

      expect(fieldMissing).toBe(false)
    })

    test("Should return 'null' for all of the rating fields", async () => {
      const response = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test8",
          title_type: "tv",
          tmdb_id: 123456,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

      let ratingFields = [
        'user_audio_quality_rating',
        'user_video_quality_rating',
        'user_stream_reliability_rating',
        'audio_average_rating',
        'video_average_rating',
        'reliability_average_rating'
      ]

      let allRatingsNull = true;

      for (var i = 0; i < ratingFields.length; i++) {
        if (response.body[ratingFields[i]] !== null) {
          allRatingsNull = false;
          break;
        }
      }

      expect(allRatingsNull).toBe(true)
    })

    test("Should return 0 for the 'count_of_reviews' property", async () => {
      const response = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test10",
          title_type: "tv",
          tmdb_id: 123456,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

      expect(response.body.count_of_reviews).toBe(0)
    })

  })

  describe("When a user has rated a stream source", () => {
    test("Should respond with a 200 status code", async () => {
      await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test10",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 3,
          user_video_quality_rating: 3,
          user_stream_reliability_rating: 3
        })

      const response = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test10",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

      expect(response.statusCode).toBe(200)
    })

    test("Should respond with an object that contains all of the expected properties", async () => {
      await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test11",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 3,
          user_video_quality_rating: 3,
          user_stream_reliability_rating: 3
        })

      const response = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test11",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

        let responseFields = [
          'user_id',
          'tmdb_id',
          'source_company_id',
          'stream_type',
          'stream_format',
          'user_audio_quality_rating',
          'user_video_quality_rating',
          'user_stream_reliability_rating',
          'audio_average_rating',
          'video_average_rating',
          'reliability_average_rating',
          'count_of_reviews'
        ]

        let fieldMissing = false;

        for (var i = 0; i < responseFields.length; i++) {
          if (response.body[responseFields[i]] === undefined) {
            fieldMissing = true;
            break;
          }
        }

        expect(fieldMissing).toBe(false)
    })

    test("Should return numeric values for all of the rating fields", async () => {
      await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test12",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 3,
          user_video_quality_rating: 3,
          user_stream_reliability_rating: 3
        })

      const response = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test12",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

        let ratingFields = [
          'user_audio_quality_rating',
          'user_video_quality_rating',
          'user_stream_reliability_rating',
          'audio_average_rating',
          'video_average_rating',
          'reliability_average_rating'
        ]

        let allRatingsExist = true;

        for (var i = 0; i < ratingFields.length; i++) {
          if (response.body[ratingFields[i]] > 0) {
            allRatingsExist = true;
          } else {
            allRatingsExist = false;
            break;
          }
        }

        expect(allRatingsExist).toBe(true)
    })

    test("Should return at least 1 for the 'count_of_reviews' property", async () => {
      await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test13",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 3,
          user_video_quality_rating: 3,
          user_stream_reliability_rating: 3
        })

      const response = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test13",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

      let reviewsCountGreaterThanZero = (response.body.count_of_reviews > 0)

      expect(reviewsCountGreaterThanZero).toBe(true)
    })

  })

})

describe("POST /api/streamRatings", () => {
  describe("When a required query paramater is missing from request", () => {
    test("Should respond with a 400 status code", async () => {
      const response = await request(app)
        .post('/api/streamRatings')
        .send({})

      expect(response.statusCode).toBe(400)
    })

    test("Should responsd with a message indicating the parameter that was missing", async () => {
      const response = await request(app)
        .post('/api/streamRatings')
        .send({})

      expect(response.error.text).toStrictEqual(
        expect.stringContaining("Error: Must provide a valid")
      )
    })

  })

  describe("When a user successfully submits source ratings", () => {
    test("Should respond with a 201 status code", async () => {
      const response = await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test14",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 3,
          user_video_quality_rating: 3,
          user_stream_reliability_rating: 3
        })

      expect(response.statusCode).toBe(201);
    })

    test("Should respond with a message confirming the save was successful", async () => {
      const response = await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test15",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 3,
          user_video_quality_rating: 3,
          user_stream_reliability_rating: 3
        })

      expect(response.text).toBe("Stream rating saved successfully");
    })

    test("Should change the overall stream source ratings in the database", async () => {
      await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test16",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 3,
          user_video_quality_rating: 3,
          user_stream_reliability_rating: 3
        })

      let firstResponse = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test16",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

      await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test17",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 1,
          user_video_quality_rating: 1,
          user_stream_reliability_rating: 1
        })

      const secondResponse = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test17",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

      let averageRatingsEqual = true;

      if (firstResponse.body.audio_average_rating !== secondResponse.body.audio_average_rating) {
        averageRatingsEqual = false;
      } else if (firstResponse.body.video_average_rating !== secondResponse.body.video_average_rating) {
        averageRatingsEqual = false;
      } else if (firstResponse.body.user_stream_reliability_rating !== secondResponse.body.user_stream_reliability_rating) {
        averageRatingsEqual = false;
      }

      expect(averageRatingsEqual).toBe(false);
    })

  })

  describe("When a user submits source ratings twice for the same source", () => {
    test("Should respond with a 201 status code", async () => {
      await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test18",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 3,
          user_video_quality_rating: 3,
          user_stream_reliability_rating: 3
        })

      const response = await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test18",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 4,
          user_video_quality_rating: 4,
          user_stream_reliability_rating: 4
        })

      expect(response.statusCode).toBe(201);
    })

    test("Should respond with a message confirming the save was successful", async () => {
      await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test19",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 3,
          user_video_quality_rating: 3,
          user_stream_reliability_rating: 3
        })

      const response = await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test19",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 4,
          user_video_quality_rating: 4,
          user_stream_reliability_rating: 4
        })

      expect(response.text).toBe("Stream rating saved successfully");
    })

    test("Should update the user's ratings for the source in the database", async () => {
      await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test20",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 3,
          user_video_quality_rating: 3,
          user_stream_reliability_rating: 3
        })

      let firstResponse = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test20",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

      await request(app)
        .post('/api/streamRatings')
        .send({
          user_id: "Test20",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K',
          user_audio_quality_rating: 1,
          user_video_quality_rating: 1,
          user_stream_reliability_rating: 1
        })

      const secondResponse = await request(app)
        .get('/api/streamRatings')
        .query({
          user_id: "Test20",
          title_type: "tv",
          tmdb_id: 1234567,
          source_company_id: 12345,
          stream_type: 'buy',
          stream_format: '4K'
        })

      let userRatingsUpdated = true;

      if (secondResponse.body.user_audio_quality_rating !== 1) {
        userRatingsUpdated = false;
      } else if (secondResponse.body.user_video_quality_rating !== 1) {
        userRatingsUpdated = false;
      } else if (secondResponse.body.user_stream_reliability_rating !== 1) {
        userRatingsUpdated = false;
      }

      expect(userRatingsUpdated).toBe(true);
    })

  })

})