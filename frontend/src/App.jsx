import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/shared/HomePage';
import AuthPage from './pages/auth/AuthPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import GoogleAuthCallbackPage from './pages/auth/GoogleAuthCallbackPage';
import CustomerDashboardPage from './pages/customer/CustomerDashboardPage';
import ChefDashboardPage from './pages/chef/ChefDashboardPage';
import BrowseMealsPage from './pages/customer/BrowseMealsPage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import OrderConfirmationPage from './pages/customer/OrderConfirmationPage';
import OrderTrackingPage from './pages/customer/OrderTrackingPage';
import ReviewsPage from './pages/customer/ReviewsPage';
import DiscoverPage from './pages/customer/DiscoverPage';
import WalletPage from './pages/customer/WalletPage';
import SubscriptionsPage from './pages/customer/SubscriptionsPage';
import ChatPage from './pages/customer/ChatPage';
import SavedPage from './pages/customer/SavedPage';
import ChefMenuPage from './pages/chef/ChefMenuPage';
import ChefOrdersPage from './pages/chef/ChefOrdersPage';
import DeliveryOtpVerificationPage from './pages/delivery/DeliveryOtpVerificationPage';
import { useAppStore } from './app/store/useAppStore';

function ProtectedRoute({ role, children }) {
  const session = useAppStore((state) => state.session);

  if (!session) {
    return <Navigate to={`/auth/${role}`} replace />;
  }

  if (session.role !== role) {
    return <Navigate to={session.role === 'chef' ? '/chef/dashboard' : '/customer/dashboard'} replace />;
  }

  return children;
}

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/:role" element={<AuthPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/google/callback" element={<GoogleAuthCallbackPage />} />
        <Route path="/customer" element={<Navigate to="/customer/dashboard" replace />} />
        <Route path="/chef" element={<Navigate to="/chef/dashboard" replace />} />

        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute role="customer">
              <CustomerDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/browse"
          element={
            <ProtectedRoute role="customer">
              <BrowseMealsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/cart"
          element={
            <ProtectedRoute role="customer">
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/checkout"
          element={
            <ProtectedRoute role="customer">
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/order-confirmation"
          element={
            <ProtectedRoute role="customer">
              <OrderConfirmationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/tracking"
          element={
            <ProtectedRoute role="customer">
              <OrderTrackingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/reviews"
          element={
            <ProtectedRoute role="customer">
              <ReviewsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/discover"
          element={
            <ProtectedRoute role="customer">
              <DiscoverPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/wallet"
          element={
            <ProtectedRoute role="customer">
              <WalletPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/subscriptions"
          element={
            <ProtectedRoute role="customer">
              <SubscriptionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/chat"
          element={
            <ProtectedRoute role="customer">
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/saved"
          element={
            <ProtectedRoute role="customer">
              <SavedPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chef/dashboard"
          element={
            <ProtectedRoute role="chef">
              <ChefDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chef/menu"
          element={
            <ProtectedRoute role="chef">
              <ChefMenuPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chef/orders"
          element={
            <ProtectedRoute role="chef">
              <ChefOrdersPage />
            </ProtectedRoute>
          }
        />

        <Route path="/delivery/verify/:orderId" element={<DeliveryOtpVerificationPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
