const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.listen(PORT, console.log(`Server running on ${PORT}.`));
