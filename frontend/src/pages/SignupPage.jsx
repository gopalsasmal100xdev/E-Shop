import { useNavigate } from "react-router-dom";
import Signup from "../components/Signup/Signup";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("You already logged in 🎉");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return <Signup />;
};

export default SignupPage;
