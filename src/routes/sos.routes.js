const express = require('express');
const { handleSOSRequest } = require('../controller/sos.controller');
const { uploadMiddleware } = require('../middleware/upload');

const router = express.Router();

router.post('/sos', uploadMiddleware, handleSOSRequest);

module.exports = router;
