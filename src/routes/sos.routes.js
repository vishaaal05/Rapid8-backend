const express = require('express');
const { handleSOSRequest, sendSOS } = require('../controllers/sos.controller');
const { uploadMiddleware } = require('../middleware/upload');

const router = express.Router();

router.post('/sos', uploadMiddleware, handleSOSRequest);
router.post('/sos/ambulance', sendSOS);

module.exports = router;
