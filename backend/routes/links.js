const express = require('express');
const auth = require('../middleware/auth');
const { getmyLinks } = require('../controllers/linkController');


const router = express.Router();

router.get('/my-links',auth,getmyLinks)

module.exports = router;