const { asyncHandler } = require('../../utils/asyncHandler');
const { chefs } = require('../../data/mockStore');

const getChefProfile = asyncHandler(async (req, res) => {
  const chefId = req.query.chefId || 'chef-1';
  const chef = chefs.find((item) => item.id === chefId);

  if (!chef) {
    return res.status(404).json({ success: false, message: 'Chef profile not found' });
  }

  return res.status(200).json({ success: true, data: chef });
});

const updateChefProfile = asyncHandler(async (req, res) => {
  const chefId = req.query.chefId || 'chef-1';
  const chef = chefs.find((item) => item.id === chefId);

  if (!chef) {
    return res.status(404).json({ success: false, message: 'Chef profile not found' });
  }

  chef.kitchenName = req.body.kitchenName || chef.kitchenName;
  chef.bio = req.body.bio || chef.bio;
  chef.city = req.body.city || chef.city;

  return res.status(200).json({ success: true, message: 'Chef profile updated', data: chef });
});

const getNearbyChefs = asyncHandler(async (req, res) => {
  const maxDistanceKm = Number(req.query.maxDistanceKm || 4);
  const rows = chefs
    .filter((chef) => Number(chef.distanceKm || 99) <= maxDistanceKm)
    .sort((a, b) => a.distanceKm - b.distanceKm);

  return res.status(200).json({ success: true, data: rows });
});

const getTopRatedKitchens = asyncHandler(async (req, res) => {
  const rows = chefs.slice().sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 5);
  return res.status(200).json({ success: true, data: rows });
});

module.exports = { getChefProfile, updateChefProfile, getNearbyChefs, getTopRatedKitchens };
