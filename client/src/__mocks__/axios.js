const mockResponse = {
  data: {
    user_id: "User3",
    tmdb_id: 329,
    user_thumb_rating: "up",
    overall_thumbs_ups: 50,
    overall_thumbs_downs: 20
  }
}

export default {
  get: jest.fn().mockResolvedValue(mockResponse)
}
