import { create } from 'zustand';

const initialFoods = [
  {
    id: 'food-1',
    dishId: 'dish-butter-chicken',
    title: 'Butter Chicken',
    chefId: 'chef-1',
    chefName: 'Chef Meera Nair',
    kitchenName: "Meera's Spice Table",
    price: 260,
    prepTime: '35 mins',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    dietTags: ['high-protein', 'low-oil'],
    cuisine: 'North Indian'
  },
  {
    id: 'food-2',
    dishId: 'dish-butter-chicken',
    title: 'Butter Chicken',
    chefId: 'chef-2',
    chefName: 'Chef Arjun Sethi',
    kitchenName: 'Sethi Tandoor House',
    price: 230,
    prepTime: '30 mins',
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    dietTags: ['high-protein'],
    cuisine: 'Punjabi'
  },
  {
    id: 'food-3',
    dishId: 'dish-paneer-tikka',
    title: 'Paneer Tikka Masala',
    chefId: 'chef-2',
    chefName: 'Chef Arjun Sethi',
    kitchenName: 'Sethi Tandoor House',
    price: 210,
    prepTime: '28 mins',
    rating: 4.7,
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Paneer_Tikka_Masala.jpg',
    isAvailable: true,
    dietTags: ['vegetarian', 'low-oil'],
    cuisine: 'North Indian'
  },
  {
    id: 'food-4',
    dishId: 'dish-hakka-noodles',
    title: 'Hakka Noodles',
    chefId: 'chef-3',
    chefName: 'Chef Kavya Rao',
    kitchenName: "Kavya's Urban Meals",
    price: 170,
    prepTime: '20 mins',
    rating: 4.4,
    image:
      'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    dietTags: ['vegetarian'],
    cuisine: 'Indo-Chinese'
  },
  {
    id: 'food-5',
    dishId: 'dish-biryani',
    title: 'Hyderabadi Biryani',
    chefId: 'chef-1',
    chefName: 'Chef Meera Nair',
    kitchenName: "Meera's Spice Table",
    price: 280,
    prepTime: '40 mins',
    rating: 4.9,
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hyderabadi_egg_biryani.jpg',
    isAvailable: true,
    dietTags: ['high-protein'],
    cuisine: 'Hyderabadi'
  },
  {
    id: 'food-6',
    dishId: 'dish-lemon-rice',
    title: 'Lemon Rice Bowl',
    chefId: 'chef-3',
    chefName: 'Chef Kavya Rao',
    kitchenName: "Kavya's Urban Meals",
    price: 140,
    prepTime: '18 mins',
    rating: 4.3,
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    dietTags: ['vegetarian', 'diabetic-friendly', 'low-oil'],
    cuisine: 'South Indian'
  },
  {
    id: 'food-7',
    dishId: 'dish-sprout-salad',
    title: 'Power Sprout Salad',
    chefId: 'chef-4',
    chefName: 'Chef Sana Iqbal',
    kitchenName: 'Sana Wellness Kitchen',
    price: 185,
    prepTime: '16 mins',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    dietTags: ['high-protein', 'diabetic-friendly', 'vegetarian', 'low-oil'],
    cuisine: 'Wellness'
  }
];

const initialReviews = [
  {
    id: 'review-1',
    foodId: 'food-5',
    chefId: 'chef-1',
    customerName: 'Aakash',
    rating: 5,
    comment: 'Fragrant rice, tender chicken, and thoughtful packaging.'
  },
  {
    id: 'review-2',
    foodId: 'food-3',
    chefId: 'chef-2',
    customerName: 'Neha',
    rating: 4,
    comment: 'Creamy and balanced paneer gravy. Great portion size.'
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

const initialChefProfiles = {
  'chef-1': {
    id: 'chef-1',
    name: 'Chef Meera Nair',
    kitchenName: "Meera's Spice Table",
    earnings: 12680,
    city: 'Bengaluru',
    rating: 4.8,
    distanceKm: 2.1,
    hygieneBadge: 'Gold Hygiene',
    specialties: ['Biryani', 'Kerala Curry']
  },
  'chef-2': {
    id: 'chef-2',
    name: 'Chef Arjun Sethi',
    kitchenName: 'Sethi Tandoor House',
    earnings: 9420,
    city: 'Bengaluru',
    rating: 4.6,
    distanceKm: 3.3,
    hygieneBadge: 'Platinum Hygiene',
    specialties: ['Tandoor', 'Paneer Gravy']
  },
  'chef-3': {
    id: 'chef-3',
    name: 'Chef Kavya Rao',
    kitchenName: "Kavya's Urban Meals",
    earnings: 8120,
    city: 'Bengaluru',
    rating: 4.4,
    distanceKm: 1.8,
    hygieneBadge: 'Gold Hygiene',
    specialties: ['Lunch Bowls', 'Quick Meals']
  },
  'chef-4': {
    id: 'chef-4',
    name: 'Chef Sana Iqbal',
    kitchenName: 'Sana Wellness Kitchen',
    earnings: 10140,
    city: 'Bengaluru',
    rating: 4.9,
    distanceKm: 2.7,
    hygieneBadge: 'Platinum Hygiene',
    specialties: ['Diabetic Meals', 'Protein Bowls']
  }
};

const initialCoupons = [
  {
    id: 'cpn-first40',
    code: 'FIRST40',
    title: '40% off for first order',
    discountType: 'percent',
    discountValue: 40,
    minOrder: 299,
    maxDiscount: 120,
    accent: 'orange'
  },
  {
    id: 'cpn-healthy75',
    code: 'HEALTHY75',
    title: 'Flat 75 off wellness dishes',
    discountType: 'flat',
    discountValue: 75,
    minOrder: 249,
    maxDiscount: 75,
    accent: 'green'
  },
  {
    id: 'cpn-kitchen20',
    code: 'KITCHEN20',
    title: '20% weekend kitchen special',
    discountType: 'percent',
    discountValue: 20,
    minOrder: 399,
    maxDiscount: 100,
    accent: 'cream'
  }
];

const sampleUsers = [
  {
    id: 'user-customer-1',
    name: 'Ritika Sharma',
    email: 'ritika.sharma@example.com',
    password: 'pass1234',
    role: 'customer'
  },
  {
    id: 'user-chef-1',
    name: 'Chef Meera Nair',
    email: 'meera.chef@example.com',
    password: 'pass1234',
    role: 'chef',
    chefId: 'chef-1'
  }
];

const initialWallets = {
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
      },
      {
        id: 'txn-3',
        type: 'refund',
        amount: 50,
        note: 'Refund for unavailable item',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
      }
    ]
  }
};

const initialSavedAddresses = {
  'user-customer-1': [
    {
      id: 'addr-home',
      label: 'Home',
      address: '17, Koramangala 4th Block, Bengaluru',
      landmark: 'Near BDA Complex'
    },
    {
      id: 'addr-work',
      label: 'Work',
      address: 'Tech Park Tower 5, HSR Layout, Bengaluru',
      landmark: 'Gate 2 pickup point'
    }
  ]
};

const initialMealPlans = {
  'user-customer-1': [
    {
      id: 'plan-1',
      title: 'High Protein Weekday Plan',
      schedule: 'Mon-Fri lunch',
      tags: ['high-protein', 'low-oil'],
      targetCalories: '550-650 kcal'
    },
    {
      id: 'plan-2',
      title: 'Diabetic-Friendly Dinner Set',
      schedule: 'Tue-Thu dinner',
      tags: ['diabetic-friendly', 'vegetarian'],
      targetCalories: '450-520 kcal'
    }
  ]
};

const initialSubscriptions = {
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

const initialChats = {
  'customer-user-customer-1-chef-1': [
    {
      id: 'msg-1',
      senderRole: 'chef',
      text: 'Hi Ritika, your biryani is being packed right now.',
      at: new Date(Date.now() - 1000 * 60 * 12).toISOString()
    },
    {
      id: 'msg-2',
      senderRole: 'customer',
      text: 'Perfect, please keep it medium spicy.',
      at: new Date(Date.now() - 1000 * 60 * 10).toISOString()
    }
  ]
};

function findCheapestByDish(foods) {
  const byDish = {};

  foods.forEach((food) => {
    if (!byDish[food.dishId] || byDish[food.dishId].price > food.price) {
      byDish[food.dishId] = {
        dishId: food.dishId,
        title: food.title,
        chefName: food.chefName,
        price: food.price,
        foodId: food.id
      };
    }
  });

  return Object.values(byDish);
}

function randomId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function generateOtp4Digit() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function applyCouponToAmount(subtotal, coupon) {
  if (!coupon || subtotal < coupon.minOrder) {
    return { discount: 0, appliedCode: null };
  }

  if (coupon.discountType === 'percent') {
    const discount = Math.min(Math.round((subtotal * coupon.discountValue) / 100), coupon.maxDiscount);
    return { discount, appliedCode: coupon.code };
  }

  return { discount: Math.min(coupon.discountValue, subtotal), appliedCode: coupon.code };
}

export const useAppStore = create((set, get) => ({
  foods: initialFoods,
  reviews: initialReviews,
  chefProfiles: initialChefProfiles,
  users: sampleUsers,
  coupons: initialCoupons,
  walletsByUser: initialWallets,
  savedAddressesByUser: initialSavedAddresses,
  savedMealPlansByUser: initialMealPlans,
  subscriptionsByUser: initialSubscriptions,
  chatsByRoom: initialChats,
  selectedDietFilters: [],
  selectedCouponCode: null,
  selectedAddressId: 'addr-home',
  session: null,
  cart: [],
  orders: [
    {
      id: 'order-1001',
      customerId: 'user-customer-1',
      chefId: 'chef-1',
      items: [{ foodId: 'food-1', quantity: 1, unitPrice: 260 }],
      status: 'out_for_delivery',
      address: 'Koramangala 4th Block, Bengaluru',
      total: 289,
      createdAt: new Date(Date.now() - 1000 * 60 * 70).toISOString(),
      deliveryOtp: '4831',
      otpGeneratedAt: new Date(Date.now() - 1000 * 60 * 38).toISOString(),
      otpVerifiedAt: null,
      deliveredAt: null,
      deliveryProofPhotoName: null,
      deliveryConfirmedBy: null
    },
    {
      id: 'order-1000',
      customerId: 'user-customer-1',
      chefId: 'chef-1',
      items: [{ foodId: 'food-5', quantity: 1, unitPrice: 280 }],
      status: 'delivered',
      address: 'Koramangala 4th Block, Bengaluru',
      total: 309,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      deliveryOtp: '2487',
      otpGeneratedAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
      otpVerifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      deliveredAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      deliveryProofPhotoName: 'doorstep-proof-1000.jpg',
      deliveryConfirmedBy: 'Ritika Sharma'
    },
    {
      id: 'order-999',
      customerId: 'user-customer-1',
      chefId: 'chef-2',
      items: [{ foodId: 'food-3', quantity: 2, unitPrice: 210 }],
      status: 'delivered',
      address: 'Koramangala 4th Block, Bengaluru',
      total: 449,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(),
      deliveryOtp: '6110',
      otpGeneratedAt: new Date(Date.now() - 1000 * 60 * 60 * 51).toISOString(),
      otpVerifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 49).toISOString(),
      deliveredAt: new Date(Date.now() - 1000 * 60 * 60 * 49).toISOString(),
      deliveryProofPhotoName: 'proof-999.png',
      deliveryConfirmedBy: 'Ritika Sharma'
    },
    {
      id: 'order-998',
      customerId: 'user-customer-2',
      chefId: 'chef-1',
      items: [{ foodId: 'food-5', quantity: 2, unitPrice: 280 }],
      status: 'delivered',
      address: 'Indiranagar, Bengaluru',
      total: 589,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
      deliveryOtp: '7359',
      otpGeneratedAt: new Date(Date.now() - 1000 * 60 * 60 * 29).toISOString(),
      otpVerifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
      deliveredAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
      deliveryProofPhotoName: 'biryani-bag.jpg',
      deliveryConfirmedBy: 'Customer'
    },
    {
      id: 'order-997',
      customerId: 'user-customer-3',
      chefId: 'chef-1',
      items: [{ foodId: 'food-1', quantity: 3, unitPrice: 260 }],
      status: 'preparing',
      address: 'MG Road, Bengaluru',
      total: 809,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      deliveryOtp: '3928',
      otpGeneratedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      otpVerifiedAt: null,
      deliveredAt: null,
      deliveryProofPhotoName: null,
      deliveryConfirmedBy: null
    },
    {
      id: 'order-996',
      customerId: 'user-customer-4',
      chefId: 'chef-1',
      items: [{ foodId: 'food-5', quantity: 1, unitPrice: 280 }],
      status: 'placed',
      address: 'Whitefield, Bengaluru',
      total: 309,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      deliveryOtp: '8460',
      otpGeneratedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      otpVerifiedAt: null,
      deliveredAt: null,
      deliveryProofPhotoName: null,
      deliveryConfirmedBy: null
    }
  ],
  lastPlacedOrder: null,

  signup: ({ name, email, password, role }) => {
    const users = get().users;
    if (users.some((user) => user.email.toLowerCase() === String(email).toLowerCase())) {
      return { ok: false, message: 'That email is already registered.' };
    }

    const user = {
      id: randomId('user'),
      name,
      email,
      password,
      role,
      chefId: role === 'chef' ? randomId('chef') : undefined
    };

    set((state) => ({ users: [...state.users, user], session: user }));
    return { ok: true, user };
  },

  login: ({ email, password, role }) => {
    const user = get().users.find(
      (item) => item.email.toLowerCase() === String(email).toLowerCase() && item.password === password && item.role === role
    );

    if (!user) {
      return { ok: false, message: 'Invalid email or password for this account type.' };
    }

    set({ session: user });
    return { ok: true, user };
  },

  googleLogin: ({ email, name, role }) => {
    const normalizedEmail = String(email || '').toLowerCase();
    if (!normalizedEmail || !name || !role) {
      return { ok: false, message: 'Google profile data is incomplete.' };
    }

    const existingUser = get().users.find(
      (item) => item.email.toLowerCase() === normalizedEmail && item.role === role
    );

    if (existingUser) {
      set({ session: existingUser });
      return { ok: true, user: existingUser };
    }

    const chefId = role === 'chef' ? randomId('chef') : undefined;
    const newUser = {
      id: randomId('user'),
      name,
      email: normalizedEmail,
      password: '',
      role,
      chefId
    };

    set((state) => ({
      users: [...state.users, newUser],
      session: newUser,
      chefProfiles:
        role === 'chef'
          ? {
              ...state.chefProfiles,
              [chefId]: {
                id: chefId,
                name,
                kitchenName: `${name.split(' ')[0] || 'Chef'}'s Home Kitchen`,
                earnings: 0,
                city: 'Bengaluru',
                rating: 0,
                distanceKm: 0,
                hygieneBadge: 'Verified Kitchen',
                specialties: ['Handcrafted Meals']
              }
            }
          : state.chefProfiles
    }));

    return { ok: true, user: newUser };
  },

  logout: () => set({ session: null, selectedCouponCode: null }),

  setDietFilters: (filters) => set({ selectedDietFilters: filters }),

  getFilteredFoods: () => {
    const filters = get().selectedDietFilters;
    const foods = get().foods;

    if (!filters.length) {
      return foods;
    }

    return foods.filter((food) => filters.every((tag) => food.dietTags.includes(tag)));
  },

  getNearbyChefs: () => {
    return Object.values(get().chefProfiles)
      .filter((chef) => chef.distanceKm <= 4)
      .sort((a, b) => a.distanceKm - b.distanceKm);
  },

  getTopRatedKitchens: () => {
    return Object.values(get().chefProfiles)
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  },

  addToCart: (foodId) => {
    set((state) => {
      const existing = state.cart.find((item) => item.foodId === foodId);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.foodId === foodId ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }

      return { cart: [...state.cart, { foodId, quantity: 1 }] };
    });
  },

  updateCartQuantity: (foodId, quantity) => {
    set((state) => {
      if (quantity <= 0) {
        return { cart: state.cart.filter((item) => item.foodId !== foodId) };
      }

      return {
        cart: state.cart.map((item) => (item.foodId === foodId ? { ...item, quantity } : item))
      };
    });
  },

  applyCoupon: (code) => {
    const coupon = get().coupons.find((item) => item.code.toLowerCase() === String(code).toLowerCase());
    if (!coupon) {
      return { ok: false, message: 'Coupon code not found.' };
    }

    set({ selectedCouponCode: coupon.code });
    return { ok: true, coupon };
  },

  clearCoupon: () => set({ selectedCouponCode: null }),

  getCartDetails: () => {
    const foods = get().foods;
    const rows = get().cart
      .map((cartItem) => {
        const food = foods.find((item) => item.id === cartItem.foodId);
        if (!food) {
          return null;
        }

        return {
          ...cartItem,
          title: food.title,
          chefName: food.chefName,
          unitPrice: food.price,
          image: food.image,
          lineTotal: food.price * cartItem.quantity
        };
      })
      .filter(Boolean);

    const subtotal = rows.reduce((sum, item) => sum + item.lineTotal, 0);
    const deliveryFee = rows.length ? 29 : 0;
    const selectedCoupon = get().coupons.find((item) => item.code === get().selectedCouponCode);
    const couponResult = applyCouponToAmount(subtotal, selectedCoupon);

    return {
      items: rows,
      subtotal,
      deliveryFee,
      discount: couponResult.discount,
      appliedCouponCode: couponResult.appliedCode,
      total: subtotal + deliveryFee - couponResult.discount
    };
  },

  getWallet: () => {
    const userId = get().session?.id;
    if (!userId) {
      return { balance: 0, cashbackBalance: 0, transactions: [] };
    }

    return get().walletsByUser[userId] || { balance: 0, cashbackBalance: 0, transactions: [] };
  },

  addWalletMoney: (amount) => {
    const userId = get().session?.id;
    if (!userId) {
      return { ok: false, message: 'Please login first.' };
    }

    set((state) => {
      const wallet = state.walletsByUser[userId] || { balance: 0, cashbackBalance: 0, transactions: [] };
      const transaction = {
        id: randomId('txn'),
        type: 'add-money',
        amount: Number(amount),
        note: 'Added from wallet top-up',
        createdAt: new Date().toISOString()
      };

      return {
        walletsByUser: {
          ...state.walletsByUser,
          [userId]: {
            ...wallet,
            balance: wallet.balance + Number(amount),
            transactions: [transaction, ...wallet.transactions]
          }
        }
      };
    });

    return { ok: true };
  },

  addCashback: (amount, note = 'Cashback reward') => {
    const userId = get().session?.id;
    if (!userId) {
      return;
    }

    set((state) => {
      const wallet = state.walletsByUser[userId] || { balance: 0, cashbackBalance: 0, transactions: [] };
      const transaction = {
        id: randomId('txn'),
        type: 'cashback',
        amount: Number(amount),
        note,
        createdAt: new Date().toISOString()
      };

      return {
        walletsByUser: {
          ...state.walletsByUser,
          [userId]: {
            ...wallet,
            cashbackBalance: wallet.cashbackBalance + Number(amount),
            transactions: [transaction, ...wallet.transactions]
          }
        }
      };
    });
  },

  addRefund: (amount, note = 'Refund credited') => {
    const userId = get().session?.id;
    if (!userId) {
      return;
    }

    set((state) => {
      const wallet = state.walletsByUser[userId] || { balance: 0, cashbackBalance: 0, transactions: [] };
      const transaction = {
        id: randomId('txn'),
        type: 'refund',
        amount: Number(amount),
        note,
        createdAt: new Date().toISOString()
      };

      return {
        walletsByUser: {
          ...state.walletsByUser,
          [userId]: {
            ...wallet,
            balance: wallet.balance + Number(amount),
            transactions: [transaction, ...wallet.transactions]
          }
        }
      };
    });
  },

  setSelectedAddress: (addressId) => set({ selectedAddressId: addressId }),

  addSavedAddress: ({ label, address, landmark }) => {
    const userId = get().session?.id;
    if (!userId) {
      return { ok: false, message: 'Please login first.' };
    }

    const row = {
      id: randomId('addr'),
      label,
      address,
      landmark
    };

    set((state) => ({
      savedAddressesByUser: {
        ...state.savedAddressesByUser,
        [userId]: [row, ...(state.savedAddressesByUser[userId] || [])]
      }
    }));

    return { ok: true };
  },

  getSavedAddresses: () => {
    const userId = get().session?.id;
    return userId ? get().savedAddressesByUser[userId] || [] : [];
  },

  getSavedMealPlans: () => {
    const userId = get().session?.id;
    return userId ? get().savedMealPlansByUser[userId] || [] : [];
  },

  addSavedMealPlan: ({ title, schedule, tags, targetCalories }) => {
    const userId = get().session?.id;
    if (!userId) {
      return { ok: false, message: 'Please login first.' };
    }

    const row = {
      id: randomId('plan'),
      title,
      schedule,
      tags,
      targetCalories
    };

    set((state) => ({
      savedMealPlansByUser: {
        ...state.savedMealPlansByUser,
        [userId]: [row, ...(state.savedMealPlansByUser[userId] || [])]
      }
    }));

    return { ok: true };
  },

  getSubscriptions: () => {
    const userId = get().session?.id;
    return userId ? get().subscriptionsByUser[userId] || [] : [];
  },

  createSubscription: ({ planName, period, mealsPerWeek, chefId, chefName, amount }) => {
    const userId = get().session?.id;
    if (!userId) {
      return { ok: false, message: 'Please login first.' };
    }

    const row = {
      id: randomId('sub'),
      planName,
      period,
      mealsPerWeek,
      chefId,
      chefName,
      amount: Number(amount),
      status: 'active'
    };

    set((state) => ({
      subscriptionsByUser: {
        ...state.subscriptionsByUser,
        [userId]: [row, ...(state.subscriptionsByUser[userId] || [])]
      }
    }));

    return { ok: true, subscription: row };
  },

  placeOrder: ({ address }) => {
    const session = get().session;
    const cart = get().getCartDetails();

    if (!session || session.role !== 'customer' || cart.items.length === 0) {
      return { ok: false, message: 'Please login as a customer and add items to cart.' };
    }

    const chefId = get().foods.find((item) => item.id === cart.items[0].foodId)?.chefId || 'chef-1';
    const deliveryOtp = generateOtp4Digit();
    const order = {
      id: randomId('order'),
      customerId: session.id,
      chefId,
      items: cart.items.map((item) => ({
        foodId: item.foodId,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      })),
      status: 'placed',
      address,
      total: cart.total,
      createdAt: new Date().toISOString(),
      deliveryOtp,
      otpGeneratedAt: new Date().toISOString(),
      otpVerifiedAt: null,
      deliveredAt: null,
      deliveryProofPhotoName: null,
      deliveryConfirmedBy: null
    };

    const cashback = Math.max(20, Math.floor(cart.subtotal * 0.03));

    set((state) => ({
      orders: [order, ...state.orders],
      cart: [],
      lastPlacedOrder: order,
      selectedCouponCode: null
    }));

    get().addCashback(cashback, `Cashback from order ${order.id}`);

    return { ok: true, order };
  },

  verifyDeliveryOtp: ({ orderId, otp, deliveryPartnerName }) => {
    const existingOrder = get().orders.find((item) => item.id === orderId);
    if (!existingOrder) {
      return { ok: false, message: 'Order not found.' };
    }

    if (existingOrder.deliveryOtp !== String(otp)) {
      return { ok: false, message: 'Incorrect OTP. Please re-check and try again.' };
    }

    const now = new Date().toISOString();

    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              otpVerifiedAt: now,
              deliveryConfirmedBy: deliveryPartnerName || 'Delivery Partner'
            }
          : order
      )
    }));

    return { ok: true, otpVerifiedAt: now };
  },

  confirmDeliveryWithProof: ({ orderId, proofPhotoName }) => {
    const existingOrder = get().orders.find((item) => item.id === orderId);
    if (!existingOrder) {
      return { ok: false, message: 'Order not found.' };
    }

    if (!existingOrder.otpVerifiedAt) {
      return { ok: false, message: 'Verify OTP before confirming delivery.' };
    }

    if (!proofPhotoName) {
      return { ok: false, message: 'Upload proof photo before confirmation.' };
    }

    const deliveredAt = new Date().toISOString();

    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: 'delivered',
              deliveredAt,
              deliveryProofPhotoName: proofPhotoName
            }
          : order
      )
    }));

    return { ok: true, deliveredAt };
  },

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((order) => (order.id === orderId ? { ...order, status } : order))
    }));
  },

  addFoodByChef: ({ title, price, prepTime, image, dishId }) => {
    const session = get().session;
    if (!session || session.role !== 'chef') {
      return { ok: false, message: 'Please login as chef first.' };
    }

    const chefProfile = get().chefProfiles[session.chefId];
    const food = {
      id: randomId('food'),
      dishId,
      title,
      chefId: session.chefId,
      chefName: session.name,
      kitchenName: chefProfile?.kitchenName || 'HomeBites Kitchen',
      price: Number(price),
      prepTime,
      rating: 0,
      image,
      isAvailable: true,
      dietTags: [],
      cuisine: 'Custom'
    };

    set((state) => ({ foods: [food, ...state.foods] }));
    return { ok: true, food };
  },

  updateFoodByChef: ({ foodId, price, isAvailable }) => {
    set((state) => ({
      foods: state.foods.map((item) =>
        item.id === foodId
          ? {
              ...item,
              price: price !== undefined ? Number(price) : item.price,
              isAvailable: isAvailable !== undefined ? Boolean(isAvailable) : item.isAvailable
            }
          : item
      )
    }));
  },

  submitReview: ({ foodId, chefId, rating, comment }) => {
    const session = get().session;
    if (!session) {
      return { ok: false, message: 'Login required to submit a review.' };
    }

    const review = {
      id: randomId('review'),
      foodId,
      chefId,
      customerName: session.name,
      rating: Number(rating),
      comment
    };

    set((state) => ({ reviews: [review, ...state.reviews] }));
    return { ok: true };
  },

  getPriceComparison: () => findCheapestByDish(get().foods),

  getChatMessages: (chefId) => {
    const customerId = get().session?.id;
    if (!customerId) {
      return [];
    }

    const roomId = `customer-${customerId}-${chefId}`;
    return get().chatsByRoom[roomId] || [];
  },

  sendChatMessage: ({ chefId, senderRole, text }) => {
    const customerId = get().session?.id;
    if (!customerId || !text.trim()) {
      return;
    }

    const roomId = `customer-${customerId}-${chefId}`;
    const row = {
      id: randomId('msg'),
      senderRole,
      text,
      at: new Date().toISOString()
    };

    set((state) => ({
      chatsByRoom: {
        ...state.chatsByRoom,
        [roomId]: [...(state.chatsByRoom[roomId] || []), row]
      }
    }));
  }
}));
