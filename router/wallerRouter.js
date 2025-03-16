const express = require('express');
const router = express.Router();
const walletController = require('../controller/wallet.js');

router.post('/wallet/:id/add', walletController.addBalance);

router.post('/wallet/:id/sub', walletController.subBalance);

module.exports = router;
