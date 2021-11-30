const asyncHandler = require('express-async-handler');
const request = require('request');

const getGdpData = asyncHandler(async (req, res) => {
  let url = `https://www.alphavantage.co/query?function=REAL_GDP&interval=quarterly&apikey=${process.env.alphaVantageApiKey}`;

  request.get(
    {
      url: url,
      json: true,
      headers: { 'User-Agent': 'request' },
    },
    (err, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        res.json(data.body.data);
      }
    }
  );
});

module.exports = {
  getGdpData,
};
