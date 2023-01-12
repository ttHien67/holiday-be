const express = require('express');
const cors = require('cors');
const packetsRouter = require('./app/routes/packet.route');
const ApiError = require('./app/api-error');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', packetsRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'));
});


module.exports = app;
