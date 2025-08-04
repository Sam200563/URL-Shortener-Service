import axios from 'axios';


export const createShortUrl = async (longUrl, token = null) => {
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};

  try {
    const response = await axios.post('/api/shorten', { longUrl }, config);
    return response.data;
  } catch (error) {
    console.error('Failed to create short url', error);

    const message =
      error.response?.data?.message || 'An unexpected error occurred';

    throw new Error(message);
  }
};
