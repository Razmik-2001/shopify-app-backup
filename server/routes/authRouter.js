const express = require('express');
const {shopifyAuth, shopifyAuthCallback, checkToken} = require('../controller/AuthController')

const router = express.Router();

router.get("/auth", shopifyAuth);
router.get('/auth/callback', shopifyAuthCallback);
router.get('/check-token', checkToken);

module.exports = router;