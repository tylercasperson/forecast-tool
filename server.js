const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

const db = require('./models');
const forecastMethodsRoute = require('./routes/forecastMethodsRoute.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(cors());

app.use('/api/forecastMethods', forecastMethodsRoute);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, console.log(`Server running on ${PORT}.`));
});
