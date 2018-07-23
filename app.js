'use strict';

const express = require('express');
const app = express();

const logger = require('morgan');
const jsonParser = require('body-parser').json;

app.use(logger('dev'));

app.use(jsonParser());

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Express server is listening on port", port);
});
