const axios = require('axios');
const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL);

exports.handler = async () => {
  const { data: { rates: result } } = await axios('https://api.exchangeratesapi.io/latest?base=USD');
  await redis.mset(result);
  return await redis.get('KRW');
};
