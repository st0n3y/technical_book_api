'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(app);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    // status will be undefined if it is on an internal server error
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;
