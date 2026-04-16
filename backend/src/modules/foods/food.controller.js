const { asyncHandler } = require('../../utils/asyncHandler');
const { foods, makeId } = require('../../data/mockStore');

const listFoods = asyncHandler(async (req, res) => {
  const q = String(req.query.q || '').toLowerCase();
  const tags = String(req.query.tags || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const filtered = foods.filter((item) =>
    (q ? `${item.title} ${item.chefName}`.toLowerCase().includes(q) : true) &&
    (tags.length ? tags.every((tag) => (item.dietTags || []).includes(tag)) : true)
  );

  return res.status(200).json({ success: true, data: filtered });
});

const createFood = asyncHandler(async (req, res) => {
  const { title, dishId, chefId, chefName, price, prepTime, image } = req.body;

  if (!title || !dishId || !chefId || !chefName || !price) {
    return res.status(400).json({ success: false, message: 'title, dishId, chefId, chefName and price are required' });
  }

  const food = {
    id: makeId('food'),
    title,
    dishId,
    chefId,
    chefName,
    price: Number(price),
    prepTime: prepTime || '30 mins',
    image:
      image ||
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    rating: 0
  };

  foods.unshift(food);

  return res.status(201).json({ success: true, message: 'Food item added', data: food });
});

const updateFood = asyncHandler(async (req, res) => {
  const { foodId } = req.params;
  const { price, isAvailable } = req.body;
  const food = foods.find((item) => item.id === foodId);

  if (!food) {
    return res.status(404).json({ success: false, message: 'Food item not found' });
  }

  if (price !== undefined) {
    food.price = Number(price);
  }

  if (isAvailable !== undefined) {
    food.isAvailable = Boolean(isAvailable);
  }

  return res.status(200).json({ success: true, message: 'Food item updated', data: food });
});

const compareDishPrices = asyncHandler(async (req, res) => {
  const { dishId } = req.params;
  const rows = foods
    .filter((item) => item.dishId === dishId)
    .map((item) => ({
      foodId: item.id,
      title: item.title,
      chefName: item.chefName,
      price: item.price,
      prepTime: item.prepTime,
      rating: item.rating,
      isAvailable: item.isAvailable
    }))
    .sort((a, b) => a.price - b.price);

  return res.status(200).json({ success: true, data: rows });
});

module.exports = { listFoods, createFood, updateFood, compareDishPrices };
