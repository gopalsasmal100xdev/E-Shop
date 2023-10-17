import { Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  HomePage,
  ProductsPage,
  FaqPage,
  BestSellingPage,
  EventsPage,
} from "./pages";
import ProfilePage from "./components/profile/ProfilePage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "./redux/reducers/User";
import { CheckoutPage, PaymentPage, ProductDetailsPage } from "./components";
import LogedInProtectedRoute from "./components/ProtectedRoutes/LogedInProtectedRoute";
import CreateShopPage from "./components/Shop/CreateShopPage";
import ShopLogin from "./components/Shop/auth/ShopLogin";
import ShopRegister from "./components/Shop/auth/ShopRegister";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <div className="bg-slate-100">
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
        <Route path="create-shop" element={<CreateShopPage />} />
        <Route path="create-shop/login" element={<ShopLogin />} />
        <Route path="create-shop/register" element={<ShopRegister />} />
      </Routes>
    </div>
  );
};

export default App;
