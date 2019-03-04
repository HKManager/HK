const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const trips = require('./routes/api/trips');
const points = require('./routes/api/points');

const app = express();

app.use(bodyParser.json());

mongoose
    .connect('mongodb://localhost:27017/comma_trips', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connect...'))
    .catch(() => console.log(err));

app.use('/api/trips', trips);
app.use('/api/points', points);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))