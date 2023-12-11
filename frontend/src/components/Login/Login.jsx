import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL_API } from "../../constants/data";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
// import RegisterToast from "../toast/RegisterToast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("gopal@gmail.com"); // set dummy email
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("password"); // set dummy password

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${SERVER_URL_API}/user/login-user`, {
        email,
        password,
      })
      .then((res) => {
        const { name } = res.data.data;
        Cookies.set("token", res.data.token, { expires: 7 });
        toast(`Welcome back ${name}`, {
          icon: "🎉",
        });
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Invalid information!");
      });
  };

  const loginAsGuest = () => {
    setEmail("guestlogin@gmail.com");
    setPassword("password@123");
    return;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible((prev) => !prev)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible((prev) => !prev)}
                    />
                  )}
                </div>
              </div>
              <div className={`${styles.noramlFlex} justify-between`}>
                <div className={`${styles.noramlFlex}`}>
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    onClick={() => loginAsGuest()}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900">
                    Use Guest Credentials
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Submit
                </button>
              </div>
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Not have any account?</h4>
                <Link to="/sign-up" className="text-blue-600 pl-2">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
