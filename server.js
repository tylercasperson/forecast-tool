const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

const db = require('./models');
const forecastMethodsRoute = require('./routes/forecastMethodsRoute.js');
const dataRoute = require('./routes/dataRoutes.js');
const dataTypesRoute = require('./routes/dataTypesRoute.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(cors());

app.use('/api/forecastMethods', forecastMethodsRoute);
app.use('/api/data', dataRoute);
app.use('/api/dataTypes', dataTypesRoute);

db.sequelize
  .sync({ force: false })
  .then(app.listen(PORT, console.log(`Server running on ${PORT}.`)));
