const express = require('express')
const {redirectTourl} = require('../controllers/urlController')

const router = express.Router();

router.get('/:code', redirectTourl)

module.exports=router;