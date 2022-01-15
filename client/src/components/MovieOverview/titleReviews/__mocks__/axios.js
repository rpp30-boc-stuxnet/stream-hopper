const mockResponse = {
  data: {
    resolved: 1
  }
}

export default {
  post: jest.fn().mockResolvedValue(mockResponse)
}