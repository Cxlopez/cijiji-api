const express = require('express');

const IndexRoutes = require('./IndexRoutes');
const AuthRoutes = require('./AuthRoutes');
const FruitsRoutes = require('./FruitsRoutes');
const AdsRoutes = require('./AdsRoutes');

const router = express.Router();

// RENDERING ROUTES
router.use('/', IndexRoutes);

// AUTHENTICATION ROUTES
router.use('/api/auth', AuthRoutes);

// CRUD REST API FRUITS ROUTES
router.use('/api/fruits', FruitsRoutes);
router.use('/api/ads', AdsRoutes);

// Catch all route
router.use((req, res) => {
  res.status(404).send({ message: 'URL Not found' });
});

module.exports = router;