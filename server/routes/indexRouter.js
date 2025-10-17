const express = require('express');
const router = express.Router();

const authRoutes = require('./authRouter');
const bannerRoutes = require('./bannerRouter');

router.use('/', authRoutes);
router.use('/', bannerRoutes);


module.exports = router;
