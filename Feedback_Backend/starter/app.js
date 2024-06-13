const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors());
const feedbackRouter = require('./routes/feedbackRoutes')
//third party middleware
// console.log(process.env.NODE_ENV);
app.use(express.json());
app.use('/api/v1/feedback', feedbackRouter);
module.exports = app;
