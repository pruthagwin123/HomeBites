export const routeConfig = {
  public: ['/', '/customer', '/chef'],
  auth: ['/auth/login', '/auth/signup'],
  customerProtected: ['/customer/cart', '/customer/orders', '/customer/wallet', '/customer/subscriptions'],
  chefProtected: ['/chef/listings', '/chef/orders', '/chef/analytics']
};
