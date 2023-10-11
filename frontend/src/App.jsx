import { useEffect } from "react";
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
import OtpVerificationPage from "./components/Login/OtpVerificationPage";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/reducers/User";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    /*axios
      .get(`${SERVER_URL_API}/user/getUser`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.response.data.message || "Something went wrong!"}`);
      });*/
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="bg-slate-100">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp-verification" element={<OtpVerificationPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Routes>
    </div>
  );
};

export default App;
