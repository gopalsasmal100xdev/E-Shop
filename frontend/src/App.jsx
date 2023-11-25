import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { lazy, useEffect } from "react";
import { fetchUser } from "./redux/reducers/User";
import { fetchSeller } from "./redux/reducers/Seller";
import { Suspense } from "react";
import { CircularLoader } from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const FaqPage = lazy(() => import("./components/FAQ/FaqPage"));
const EventsPage = lazy(() => import("./components/events/EventsPage"));
const ProfilePage = lazy(() => import("./components/Profile/ProfilePage"));
const BestSellingPage = lazy(() =>
  import("./components/BestSelling/BestSellingPage")
);
const CheckoutPage = lazy(() => import("./components/Checkout/CheckoutPage"));
const PaymentPage = lazy(() => import("./components/Payment/PaymentPage"));
const ProductDetailsPage = lazy(() =>
  import("./components/Products/ProductDetailsPage")
);
const LogedInProtectedRoute = lazy(() =>
  import("./components/ProtectedRoutes/LogedInProtectedRoute")
);
const ShopAllEventsPage = lazy(() =>
  import("./components/Shop/pages/ShopAllEventsPage")
);
const ShopAllOrdersPage = lazy(() =>
  import("./components/Shop/pages/ShopAllOrdersPage")
);
const ShopDiscountPage = lazy(() =>
  import("./components/Shop/pages/ShopDiscountPage")
);
const ShopInboxPage = lazy(() =>
  import("./components/Shop/pages/ShopInboxPage")
);
const ShopRefundsPage = lazy(() =>
  import("./components/Shop/pages/ShopRefundsPage")
);
const ShopLoginPage = lazy(() =>
  import("./components/Shop/pages/ShopLoginPage")
);
const ShopRegisterPage = lazy(() =>
  import("./components/Shop/pages/ShopRegisterPage")
);
const ShopSettingsPage = lazy(() =>
  import("./components/Shop/pages/ShopSettingsPage")
);
const ShopWithDrawMoneyPage = lazy(() =>
  import("./components/Shop/pages/ShopWithDrawMoneyPage")
);
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const ShopDashboardPage = lazy(() =>
  import("./components/Shop/pages/ShopDashboardPage")
);
const SellerProtectedRoute = lazy(() =>
  import("./components/ProtectedRoutes/SellerLoginProtectedRoute")
);
const ShopProfilePage = lazy(() =>
  import("./components/Shop/Profile/ShopProfilePage")
);
const ShopCreateProductPage = lazy(() =>
  import("./components/Shop/pages/ShopCreateProductPage")
);
const ShopAllProductsPage = lazy(() =>
  import("./components/Shop/pages/ShopAllProductsPage")
);
const ShopCreateEventPage = lazy(() =>
  import("./components/Shop/pages/ShopCreateEventPage")
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchSeller());
  }, [dispatch]);
  return (
    <div className="bg-slate-100" style={{ userSelect: "none" }}>
      <Suspense fallback={<CircularLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:details" element={<ProductDetailsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route
            path="/profile"
            element={
              <LogedInProtectedRoute>
                <ProfilePage />
              </LogedInProtectedRoute>
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          {/* Shop routes */}
          <Route path="/shop">
            <Route
              path="dashboard"
              element={
                <SellerProtectedRoute>
                  <ShopDashboardPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="orders"
              element={
                <SellerProtectedRoute>
                  <ShopAllOrdersPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="create-product"
              element={
                <SellerProtectedRoute>
                  <ShopCreateProductPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="all-products"
              element={
                <SellerProtectedRoute>
                  <ShopAllProductsPage />
                </SellerProtectedRoute>
              }
            />
            <Route path=":id" element={<ShopProfilePage />} />
            <Route
              path="create-event"
              element={
                <SellerProtectedRoute>
                  <ShopCreateEventPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="withdraw-money"
              element={
                <SellerProtectedRoute>
                  <ShopWithDrawMoneyPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="events"
              element={
                <SellerProtectedRoute>
                  <ShopAllEventsPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="coupons"
              element={
                <SellerProtectedRoute>
                  <ShopDiscountPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="inbox"
              element={
                <SellerProtectedRoute>
                  <ShopInboxPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="refunds"
              element={
                <SellerProtectedRoute>
                  <ShopRefundsPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <SellerProtectedRoute>
                  <ShopSettingsPage />
                </SellerProtectedRoute>
              }
            />
            <Route path="login" element={<ShopLoginPage />} />
            <Route path="register" element={<ShopRegisterPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
