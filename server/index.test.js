// import supertest from 'supertest';
// import app from './index.js';
const request = require('supertest');
const app = require('./app.js');
const database = require("../database/index.js");

beforeAll(async () => {
  await database.connect();
})

afterAll(async () => {
  // Closing the DB connection allows Jest to exit successfully.
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

    // test("Should return an array object", async () => {
    //   const response = await request(app)
    //     .get('/api/savedTitles')
    //     .query({user_id: 'Test1'})

    //   expect(response.statusCode).toBe(200)
    // })
  })

  // describe("When the user_id is missing from the request", async () => {
  //   // Should respond with a 400 status code
  // })

  // describe("When the user has saved titles", () => {
  //   // Should respond with a 200 status code
  //   // Should have an array with a length greater than zero
  // })

  // describe("When the user does not have any saved titles", () => {
  //   // Should respond with a 200 status code
  //   // Should have an array with a length of zero
  // })

});

