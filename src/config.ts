import dotenv from 'dotenv';

dotenv.config();

export const config = {
  fillout: {
    apiKey: process.env.FILLOUT_API_KEY,
    baseUrl: 'https://api.fillout.com/v1/api/forms',
  },
};
