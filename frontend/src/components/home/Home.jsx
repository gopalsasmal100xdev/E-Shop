import { Header } from "../../components";
import BestDeals from "./BestDeals/BestDeals";
import Categories from "./categories/Categories";
import Hero from "./hero/Hero";
import FeaturedProduct from "./FeaturedProduct/FeaturedProduct";
import Events from "../events/Events";
import Sponsored from "./Sponsored/Sponsored";
import Footer from "../layout/Footer";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(2, 2);
  }, []);
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default Home;
