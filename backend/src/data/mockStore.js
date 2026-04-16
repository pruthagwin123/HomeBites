const dishCatalog = [
  { id: 'dish-butter-chicken', name: 'Butter Chicken' },
  { id: 'dish-paneer-tikka', name: 'Paneer Tikka Masala' },
  { id: 'dish-hakka-noodles', name: 'Hakka Noodles' },
  { id: 'dish-chole-bhature', name: 'Chole Bhature' },
  { id: 'dish-biryani', name: 'Hyderabadi Biryani' },
  { id: 'dish-lemon-rice', name: 'Lemon Rice Bowl' }
];

const chefs = [
  {
    id: 'chef-1',
    userId: 'user-chef-1',
    name: 'Chef Meera Nair',
    kitchenName: 'Meera\'s Spice Table',
    bio: 'Kerala-style comfort curries and weekend biryani specials.',
    city: 'Bengaluru',
    rating: 4.8,
    hygieneBadge: 'Gold Hygiene',
    distanceKm: 2.1
  },
  {
    id: 'chef-2',
    userId: 'user-chef-2',
    name: 'Chef Arjun Sethi',
    kitchenName: 'Sethi Tandoor House',
    bio: 'Punjabi classics cooked in small handcrafted batches.',
    city: 'Bengaluru',
    rating: 4.6,
    hygieneBadge: 'Platinum Hygiene',
    distanceKm: 3.3
  },
  {
    id: 'chef-3',
    userId: 'user-chef-3',
    name: 'Chef Kavya Rao',
    kitchenName: 'Kavya\'s Urban Meals',
    bio: 'Affordable everyday tiffins with clean ingredients.',
    city: 'Bengaluru',
    rating: 4.4,
    hygieneBadge: 'Gold Hygiene',
    distanceKm: 1.8
  },
  {
    id: 'chef-4',
    userId: 'user-chef-4',
    name: 'Chef Sana Iqbal',
    kitchenName: 'Sana Wellness Kitchen',
    bio: 'Health-forward menu for diabetic and high-protein preferences.',
    city: 'Bengaluru',
    rating: 4.9,
    hygieneBadge: 'Platinum Hygiene',
    distanceKm: 2.7
  }
];

const users = [
  {
    id: 'user-customer-1',
    name: 'Ritika Sharma',
    email: 'ritika.sharma@example.com',
    password: 'pass1234',
    role: 'customer'
  },
  {
    id: 'user-chef-1',
    name: 'Meera Nair',
    email: 'meera.chef@example.com',
    password: 'pass1234',
    role: 'chef'
  },
  {
    id: 'user-chef-2',
    name: 'Arjun Sethi',
    email: 'arjun.chef@example.com',
    password: 'pass1234',
    role: 'chef'
  },
  {
    id: 'user-chef-3',
    name: 'Kavya Rao',
    email: 'kavya.chef@example.com',
    password: 'pass1234',
    role: 'chef'
  },
  {
    id: 'user-chef-4',
    name: 'Sana Iqbal',
    email: 'sana.chef@example.com',
    password: 'pass1234',
    role: 'chef'
  }
];

const foods = [
  {
    id: 'food-1',
    dishId: 'dish-butter-chicken',
    title: 'Butter Chicken',
    chefId: 'chef-1',
    chefName: 'Chef Meera Nair',
    price: 260,
    prepTime: '35 mins',
    image:
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    rating: 4.8,
    dietTags: ['high-protein', 'low-oil']
  },
  {
    id: 'food-2',
    dishId: 'dish-butter-chicken',
    title: 'Butter Chicken',
    chefId: 'chef-2',
    chefName: 'Chef Arjun Sethi',
    price: 230,
    prepTime: '30 mins',
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    rating: 4.5,
    dietTags: ['high-protein']
  },
  {
    id: 'food-3',
    dishId: 'dish-paneer-tikka',
    title: 'Paneer Tikka Masala',
    chefId: 'chef-2',
    chefName: 'Chef Arjun Sethi',
    price: 210,
    prepTime: '28 mins',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Paneer_Tikka_Masala.jpg',
    isAvailable: true,
    rating: 4.7,
    dietTags: ['vegetarian', 'low-oil']
  },
  {
    id: 'food-4',
    dishId: 'dish-hakka-noodles',
    title: 'Hakka Noodles',
    chefId: 'chef-3',
    chefName: 'Chef Kavya Rao',
    price: 170,
    prepTime: '20 mins',
    image:
      'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    rating: 4.4,
    dietTags: ['vegetarian']
  },
  {
    id: 'food-5',
    dishId: 'dish-biryani',
    title: 'Hyderabadi Biryani',
    chefId: 'chef-1',
    chefName: 'Chef Meera Nair',
    price: 280,
    prepTime: '40 mins',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hyderabadi_egg_biryani.jpg',
    isAvailable: true,
    rating: 4.9,
    dietTags: ['high-protein']
  },
  {
    id: 'food-6',
    dishId: 'dish-lemon-rice',
    title: 'Lemon Rice Bowl',
    chefId: 'chef-3',
    chefName: 'Chef Kavya Rao',
    price: 140,
    prepTime: '18 mins',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    rating: 4.3,
    dietTags: ['vegetarian', 'diabetic-friendly', 'low-oil']
  },
  {
    id: 'food-7',
    dishId: 'dish-sprout-salad',
    title: 'Power Sprout Salad',
    chefId: 'chef-4',
    chefName: 'Chef Sana Iqbal',
    price: 185,
    prepTime: '16 mins',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    rating: 4.8,
    dietTags: ['high-protein', 'diabetic-friendly', 'vegetarian', 'low-oil']
  }
];

const cartsByUser = {
  'user-customer-1': []
};

const orders = [
  {
    id: 'order-1001',
    customerId: 'user-customer-1',
    chefId: 'chef-1',
    items: [{ foodId: 'food-1', quantity: 1, price: 260 }],
    totalAmount: 260,
    status: 'out_for_delivery',
    createdAt: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    eta: '18 mins',
    address: 'Koramangala 4th Block, Bengaluru',
    deliveryOtp: '4831',
    otpGeneratedAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    otpVerifiedAt: null,
    deliveredAt: null,
    deliveryProofPhotoName: null,
    deliveryConfirmedBy: null
  }
];

const reviews = [
  {
    id: 'review-1',
    foodId: 'food-5',
    chefId: 'chef-1',
    customerName: 'Aakash',
    rating: 5,
    comment: 'The biryani had perfect spice and fragrance. Felt truly homemade.'
  },
  {
    id: 'review-2',
    foodId: 'food-3',
    chefId: 'chef-2',
    customerName: 'Neha',
    rating: 4,
    comment: 'Creamy paneer gravy and generous paneer cubes. Will reorder.'
  },
  {
    id: 'review-3',
    foodId: 'food-7',
    chefId: 'chef-4',
    customerName: 'Pranav',
    rating: 5,
    comment: 'Clean ingredients and super fresh textures.'
  }
];

const walletsByUser = {
  'user-customer-1': {
    balance: 840,
    cashbackBalance: 110,
    transactions: [
      {
        id: 'txn-1',
        type: 'add-money',
        amount: 500,
        note: 'Added via UPI',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString()
      },
      {
        id: 'txn-2',
        type: 'cashback',
        amount: 60,
        note: 'Cashback from order order-1001',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString()
      }
    ]
  }
};

const subscriptionsByUser = {
  'user-customer-1': [
    {
      id: 'sub-weekly-1',
      planName: 'Weekly Family Comfort Box',
      period: 'weekly',
      mealsPerWeek: 6,
      chefId: 'chef-1',
      chefName: 'Chef Meera Nair',
      amount: 1799,
      status: 'active'
    },
    {
      id: 'sub-monthly-1',
      planName: 'Monthly Wellness Lunch',
      period: 'monthly',
      mealsPerWeek: 5,
      chefId: 'chef-4',
      chefName: 'Chef Sana Iqbal',
      amount: 5999,
      status: 'active'
    }
  ]
};

const coupons = [
  {
    id: 'cpn-first40',
    code: 'FIRST40',
    title: '40% off for first order',
    discountType: 'percent',
    discountValue: 40,
    minOrder: 299,
    maxDiscount: 120
  },
  {
    id: 'cpn-healthy75',
    code: 'HEALTHY75',
    title: 'Flat 75 off wellness dishes',
    discountType: 'flat',
    discountValue: 75,
    minOrder: 249,
    maxDiscount: 75
  }
];

const savedAddressesByUser = {
  'user-customer-1': [
    {
      id: 'addr-home',
      label: 'Home',
      address: '17, Koramangala 4th Block, Bengaluru',
      landmark: 'Near BDA Complex'
    }
  ]
};

const savedMealPlansByUser = {
  'user-customer-1': [
    {
      id: 'plan-1',
      title: 'High Protein Weekday Plan',
      schedule: 'Mon-Fri lunch',
      tags: ['high-protein', 'low-oil'],
      targetCalories: '550-650 kcal'
    }
  ]
};

const chatsByRoom = {
  'customer-user-customer-1-chef-1': [
    {
      id: 'msg-1',
      senderRole: 'chef',
      text: 'Hi Ritika, your biryani is being packed right now.',
      at: new Date(Date.now() - 1000 * 60 * 12).toISOString()
    }
  ]
};

const passwordResetTokens = [];

function makeId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function getCartWithTotals(userId) {
  const cartItems = cartsByUser[userId] || [];
  const items = cartItems
    .map((entry) => {
      const food = foods.find((item) => item.id === entry.foodId);
      if (!food) {
        return null;
      }

      return {
        foodId: food.id,
        title: food.title,
        chefName: food.chefName,
        unitPrice: food.price,
        quantity: entry.quantity,
        lineTotal: food.price * entry.quantity,
        image: food.image
      };
    })
    .filter(Boolean);

  const subTotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const deliveryFee = items.length > 0 ? 29 : 0;
  const total = subTotal + deliveryFee;

  return { items, subTotal, deliveryFee, total };
}

module.exports = {
  users,
  chefs,
  foods,
  orders,
  reviews,
  dishCatalog,
  cartsByUser,
  walletsByUser,
  subscriptionsByUser,
  coupons,
  savedAddressesByUser,
  savedMealPlansByUser,
  chatsByRoom,
  passwordResetTokens,
  makeId,
  getCartWithTotals
};