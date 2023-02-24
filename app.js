const express = require('express');
const cors = require('cors');
const packetsRouter = require('./app/routes/packet.route');
const destinationsRouter = require('./app/routes/destination.route');
const contactsRouter = require('./app/routes/contact.route');
const ApiError = require('./app/api-error');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/packets', packetsRouter);
app.use('/api/destinations', destinationsRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'));
});


module.exports = app;
