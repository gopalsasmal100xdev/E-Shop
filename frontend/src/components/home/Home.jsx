import { Header } from "../../components";
import BestDeals from "./BestDeals/BestDeals";
import Categories from "./categories/Categories";
import Hero from "./hero/Hero";
import FeaturedProduct from "./FeaturedProduct/FeaturedProduct";
import Events from "../events/Events";

const Home = () => {
  return (
    <div className="bg-slate-100">
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
    </div>
  );
};

export default Home;
