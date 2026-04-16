const express = require('express');
const {
	getChefProfile,
	updateChefProfile,
	getNearbyChefs,
	getTopRatedKitchens
} = require('./chef.controller');

const router = express.Router();

router.get('/me', getChefProfile);
router.get('/nearby', getNearbyChefs);
router.get('/top-rated', getTopRatedKitchens);
router.patch('/me', updateChefProfile);

module.exports = router;
