const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController.js')
router.route('/').get(feedbackController.getAllFeedbacks).post(feedbackController.checkBody, feedbackController.createFeedback);
module.exports = router; 