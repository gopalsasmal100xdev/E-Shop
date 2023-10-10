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
// import axios from "axios";
// import { SERVER_URL_API } from "./constants/data";
// import toast from "react-hot-toast";
// import Cookies from "js-cookie";

const App = () => {
  useEffect(() => {
    // const token = Cookies.get("token");
    // axios
    //   .get(`${SERVER_URL_API}/user/getUser`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     toast.error(`${err?.response?.data?.message}`);
    //   });
  }, []);

  return (
    <div className="bg-slate-100">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
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
