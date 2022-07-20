const express = require('express');
const router = express.Router();
const hashController = require('../controllers/hashController');

router.get('/' , hashController.showForm);
router.post('/sendhash', hashController.hashProcces);

module.exports = router;