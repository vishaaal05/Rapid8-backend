const express = require('express');
const { handleSOSRequest } = require('../controller/sos.controller');

const router = express.Router();

router.post('/sos', handleSOSRequest);

module.exports = router;
