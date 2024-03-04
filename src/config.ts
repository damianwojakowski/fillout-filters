import dotenv from 'dotenv';

dotenv.config();

export const config = {
  fillout: {
    apiKey: process.env.API_KEY,
    baseUrl: process.env.BASE_URL
  },
};
