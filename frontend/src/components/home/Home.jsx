import { Header } from "../../components";
import BestDeals from "./BestDeals/BestDeals";
import Categories from "./categories/Categories";
import Hero from "./hero/Hero";
import FeaturedProduct from "./FeaturedProduct/FeaturedProduct";

const Home = () => {
  return (
    <div className="bg-slate-100">
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <FeaturedProduct />
    </div>
  );
};

export default Home;
