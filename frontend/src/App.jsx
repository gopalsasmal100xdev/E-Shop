import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage, SignupPage, HomePage } from "./pages";
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
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
    </>
  );
};

export default App;
