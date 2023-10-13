import { useEffect } from "react";
import Login from "../components/Login/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      toast.success("You already logged in 🎉");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return <Login />;
};

export default LoginPage;
