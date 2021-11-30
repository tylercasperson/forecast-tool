const colors = require('colors');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

const db = require('./models');
const dataTypesRoute = require('./routes/dataTypesRoute.js');
const timePeriodTypesRoute = require('./routes/timePeriodTypesRoute.js');
const timePeriodsRoute = require('./routes/timePeriodsRoute.js');
const salesDataRoute = require('./routes/salesDataRoute.js');
const groupedDataRoute = require('./routes/groupedDataRoute.js');
const gdpRoute = require('./routes/gdpRoute.js');

const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(cors());

app.use('/api/dataTypes', dataTypesRoute);
app.use('/api/timePeriodTypes', timePeriodTypesRoute);
app.use('/api/timePeriods', timePeriodsRoute);
app.use('/api/salesData', salesDataRoute);
app.use('/api/groupedData', groupedDataRoute);
app.use('/api/gdp', gdpRoute);

app.use(notFound);
app.use(errorHandler);

db.sequelize
  .sync({ force: false })
  .then(app.listen(PORT, console.log(`Server running on ${PORT}.`.yellow.bold)));
