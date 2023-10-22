import Home from "../components/home/Home";
import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/reducers/User";
import { useEffect } from "react";
import { fetchSeller } from "../redux/reducers/Seller";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchSeller());
  }, [dispatch]);

  return <Home />;
};

export default HomePage;
