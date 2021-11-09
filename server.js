const colors = require('colors');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

const db = require('./models');
const forecastMethodsRoute = require('./routes/forecastMethodsRoute.js');
const dataRoute = require('./routes/dataRoute.js');
const dataTypesRoute = require('./routes/dataTypesRoute.js');
const timePeriodsRoute = require('./routes/timePeriodsRoute.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(cors());

app.use('/api/forecastMethods', forecastMethodsRoute);
app.use('/api/data', dataRoute);
app.use('/api/dataTypes', dataTypesRoute);
app.use('/api/timePeriods', timePeriodsRoute);

db.sequelize
  .sync({ force: false })
  .then(
    app.listen(PORT, console.log(`Server running on ${PORT}.`.yellow.bold))
  );
